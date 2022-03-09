import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useGetAllTags } from '@/rendererApi/tags';
import { UseQueryOptions } from 'react-query';

import { Badge, Empty, Popover, Select } from 'antd';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { DownOutlined } from '@ant-design/icons';
import Loading from '../illustration/loading';
import { random } from 'lodash';
import { IconChevronDown, IconSearch } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';

const { Option, OptGroup } = Select;

const { useRef, useState, useEffect, useMemo } = React;

const dropDownWidth = 260;

const TagSelectorWrapperSection = styled.section`
  background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND};
  :hover {
    background-color: ${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG};
  }
`;

const TagSelectorLabelSection = styled.section`
  color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
  padding-left: 12px;
  padding-right: 12px;
  display: inline-block;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  border-radius: 2px;
  cursor: pointer;
`;

const PopoverContent = styled.section`
  width: ${dropDownWidth};
`;

export type FormattedTagItem = {
  disabled?: boolean;
  key?: string;
  label?: string;
  value?: string;
};

type TagSelectorProps = {
  onChange?: (val: FormattedTagItem[] | string[]) => unknown;
  value?: FormattedTagItem[] | string[];
  labelInValue?: boolean;
};

const noop = () => {
  /** noop */
};

export function labelsTypeIsString(labels: FormattedTagItem[] | string[], labelInValue: boolean): labels is string[] {
  return !labelInValue;
}

export function labelsTypeIsFormattedTags(
  labels: FormattedTagItem[] | string[],
  labelInValue: boolean,
): labels is FormattedTagItem[] {
  return labelInValue;
}

export function labelTypeIsFormattedTag(
  label: FormattedTagItem | string,
  labelInValue: boolean,
): label is FormattedTagItem {
  return labelInValue;
}

const TagSelector: React.FC<TagSelectorProps> = (props: TagSelectorProps) => {
  const { value = [], onChange = noop, labelInValue = false } = props;

  // const [selectedVal, setSelectedVal] = useState<FormattedTagItem[] | string[]>(value);
  const selectedVal = useRef<FormattedTagItem[] | string[]>(value || []);

  selectedVal.current = value || [];

  const [requestParams, setRequestParams] = useState<{
    enableRequest: boolean;
  }>({
    enableRequest: true,
  });

  const onRequestSuccess = () => {
    if (requestParams.enableRequest) {
      setRequestParams({ ...requestParams, enableRequest: false });
    }
  };

  const onRequestError = () => {
    if (requestParams.enableRequest) {
      setRequestParams({ ...requestParams, enableRequest: false });
    }
  };

  const queryOptions: Omit<UseQueryOptions<GetAllTagsResp['data']['tagGroups'], Error>, 'queryKey' | 'queryFn'> = {
    enabled: requestParams.enableRequest,
    onSuccess: onRequestSuccess,
    onError: onRequestError,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  };

  const { isLoading, isSuccess, isError, data, error } = useGetAllTags(queryOptions);

  const cb = (selectedTags: FormattedTagItem[] | string[]) => {
    if (labelsTypeIsString(selectedTags, labelInValue)) {
      onChange?.(selectedTags);
    } else if (labelsTypeIsFormattedTags(selectedTags, labelInValue)) {
      onChange?.(selectedTags);
    }
  };

  /** A hacky way to always show placeholder */
  const [fakeItemEnable, setFakeItemEnable] = useState<boolean>(false);

  const [dropDownVisible, setDropDownVisible] = useState(false);

  const popoverContent = (
    <PopoverContent>
      {isLoading && <Loading></Loading>}
      {!isLoading && (
        <>
          <Select
            style={{ width: dropDownWidth }}
            showSearch
            bordered={false}
            placeholder="搜索标签"
            labelInValue
            optionFilterProp="label"
            suffixIcon={
              dropDownVisible ? (
                <IconSearch style={withSemiIconStyle({ top: 0 })} />
              ) : (
                <IconChevronDown style={withSemiIconStyle({ top: 0 })} />
              )
            }
            onDropdownVisibleChange={(visible) => {
              setDropDownVisible(visible);
            }}
            value={fakeItemEnable ? null : undefined}
            onChange={(val: FormattedTagItem) => {
              if (labelsTypeIsFormattedTags(selectedVal.current, labelInValue)) {
                const res1 = [...selectedVal.current, val || {}];
                selectedVal.current = res1;
                cb(res1);
              } else {
                const res2 = [...selectedVal.current, val.value || ''];
                selectedVal.current = res2;
                cb(res2);
              }
            }}
            onSelect={() => {
              setFakeItemEnable(true);
            }}
          >
            {(!isLoading &&
              data?.map((tagGroup) => {
                return (
                  <OptGroup key={tagGroup.name} label={tagGroup?.transName || tagGroup?.name || ''}>
                    {tagGroup.tagRelation?.map((r) => {
                      return (
                        <Option
                          key={r.tag?.slug || random()}
                          value={r.tag?.slug || random()}
                          label={r.tag?.nameTranslated || r.tag?.name || ''}
                          disabled={value?.some((v) => {
                            if (labelTypeIsFormattedTag(v, labelInValue)) {
                              return v.value === r.tag.slug;
                            } else {
                              return v === r.tag.slug;
                            }
                          })}
                        >
                          {r.tag?.nameTranslated || r.tag?.name || ''}
                        </Option>
                      );
                    })}
                  </OptGroup>
                );
              })) || <Empty></Empty>}
          </Select>
        </>
      )}
    </PopoverContent>
  );

  return (
    <TagSelectorWrapperSection>
      <Popover content={popoverContent} trigger="click" placement="bottomLeft">
        <TagSelectorLabelSection>
          标签
          <Badge
            style={{ backgroundColor: COLOR_PALETTE.LEETECHO_BLUE, marginLeft: 6, position: 'relative', top: -1 }}
            count={selectedVal.current?.length || 0}
            size="small"
          ></Badge>
          <DownOutlined
            style={{
              position: 'relative',
              top: -1,
              color: 'rgba(0, 0, 0, 0.45)',
              padding: 1,
              marginLeft: 4,
              marginTop: -2,
              fontSize: 12,
            }}
          />
        </TagSelectorLabelSection>
      </Popover>
    </TagSelectorWrapperSection>
  );
};

export default TagSelector;
