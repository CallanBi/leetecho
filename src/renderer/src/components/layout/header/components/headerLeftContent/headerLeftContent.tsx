import * as React from 'react';
import styled from '@emotion/styled';
// import { css } from '@emotion/react';
import { Button, Dropdown, Input, List, Menu, Popover, SelectProps, Typography } from 'antd';
import { COLOR_PALETTE } from 'src/const/theme/color';
import SearchEnterBtn from '../searchEnterBtn';
import { useDebounce } from 'ahooks';
import { UseQueryOptions } from 'react-query';
import { useGetProblems } from '@/rendererApi';
import Loading from '@/components/illustration/loading';
import { useRouter } from '@/hooks/router/useRouter';
import { css } from '@emotion/react';
import { ProblemItemFromGraphQL } from 'src/main/api/leetcodeServices/utils/interfaces';

const { Search } = Input;

// const { useRef, useState, useEffect, useMemo } = React;

const SEARCH_POPOVER_WIDTH = 260;
const SEARCH_WIDTH = 260;

const HeaderSearchSection = styled.section`
  -webkit-app-region: no-drag;
  display: flex;
  vertical-align: middle;
  justify-content: center;
  margin-left: 24px;
  margin-right: auto;
  width: ${SEARCH_WIDTH}px;
  /* .ant-input {
    background-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
    border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
    border-radius: 32px;

    :hover {
      border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG_HOVER};
    }

    :focus {
      border-color: ${COLOR_PALETTE.LEETECHO_BLUE};
      box-shadow: none;
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND};
    }
  }
  */
  .ant-btn {
    border-top-right-radius: 32px !important;
    border-bottom-right-radius: 32px !important;
  }

  /* input {
    padding-left: 13.5px;
    font-size: 13.5px;
  } */

  .ant-input-suffix {
    background-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
    border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
    margin: 0;
    padding: 4;
    .ant-input {
      background-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
      border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
      border-radius: 32px;
    }
    :hover {
      border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG_HOVER}!important;
      .ant-input {
        border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG_HOVER}!important;
      }
    }

    :focus {
      border-color: ${COLOR_PALETTE.LEETECHO_BLUE}!important;
      box-shadow: none;
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
      .ant-input {
        box-shadow: none;
        background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
      }
    }
  }

  .ant-input-affix-wrapper {
    background-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
    border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
    border-top-left-radius: 32px !important;
    border-bottom-left-radius: 32px !important;

    input {
      padding-left: 6px;
      font-size: 13.5px;
    }

    .ant-input {
      background-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
      border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG};
      border-radius: 32px;
    }

    :hover {
      border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG_HOVER}!important;
      .ant-input {
        border-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG_HOVER}!important;
      }
    }

    :focus {
      border-color: ${COLOR_PALETTE.LEETECHO_BLUE}!important;
      box-shadow: none;
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
      .ant-input {
        box-shadow: none;
        background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
        border-color: ${COLOR_PALETTE.LEETECHO_BLUE}!important;
      }
    }
  }
`;

const searchStyle: React.CSSProperties = {
  margin: 'auto',
  width: `${SEARCH_WIDTH}`,
};

interface HeaderLeftContentProps {}

const HeaderLeftContent: React.FC<HeaderLeftContentProps> = (props: HeaderLeftContentProps) => {
  const {} = props;

  const [searchVal, setSearchVal] = React.useState<string>('');

  const debouncedSearchVal = useDebounce(searchVal, { wait: 700 });

  const isDebounceEqual = debouncedSearchVal === searchVal;

  let enableRequest = isDebounceEqual && searchVal !== '';

  const onQuerySuccess = () => {
    if (enableRequest) {
      enableRequest = false;
    }
  };

  const onQueryError = () => {
    if (enableRequest) {
      enableRequest = false;
    }
  };

  const queryOptions: Omit<UseQueryOptions<GetProblemsResp['data'], Error>, 'queryKey' | 'queryFn'> = {
    enabled: enableRequest,
    onSuccess: onQuerySuccess,
    onError: onQueryError,
  };

  const {
    isLoading: isGetProblemsLoading,
    isSuccess: isGetProblemsSuccess,
    isError: isGetProblemsError,
    data: getProblemsData,
    error: getProblemsError,
  } = useGetProblems(
    {
      limit: 8,
      filters: {
        searchKeywords: debouncedSearchVal,
      },
    },
    queryOptions,
  );

  const router = useRouter();

  const onShowAllProblems = (search: string) => {
    setPopoverVisible(false);
    router.push(`/allProblems?search=${search}`);
  };

  const onDropdownHandleShowAll: React.MouseEventHandler<HTMLElement> = (_) => {
    onShowAllProblems(debouncedSearchVal);
  };

  const options =
    getProblemsData?.questions?.map((question) => {
      return question?.frontendQuestionId && question.titleCn
        ? { label: `${question.frontendQuestionId ?? ''}: ${question.titleCn}`, value: question }
        : { label: '', value: '' };
    }) || [];

  const [popoverVisible, setPopoverVisible] = React.useState(true);

  return (
    <HeaderSearchSection>
      <Popover
        content={
          isGetProblemsLoading ? (
            <section
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: SEARCH_POPOVER_WIDTH,
                height: 150,
                alignItems: 'center',
              }}
            >
              <Loading style={{ width: 30, height: 30 }} />
            </section>
          ) : (
            <List
              bordered
              style={{
                padding: 0,
                width: SEARCH_POPOVER_WIDTH,
              }}
              size="small"
              footer={
                options?.length > 0 ? (
                  <section style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      type="link"
                      style={{ color: COLOR_PALETTE.LEETECHO_LIGHT_BLUE }}
                      onClick={onDropdownHandleShowAll}
                    >
                      显示所有 {getProblemsData?.total || 0} 个结果
                    </Button>
                  </section>
                ) : (
                  ''
                )
              }
              dataSource={options}
              renderItem={(item) => (
                <List.Item
                  css={css`
                    cursor: pointer;
                    :hover {
                      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG};
                    }
                  `}
                  onClick={() => {
                    router.push(`problemDetail?titleSlug=${(item.value as ProblemItemFromGraphQL)?.titleSlug || ''}`);
                    setPopoverVisible(false);
                  }}
                >
                  {item.label}
                </List.Item>
              )}
            />
          )
        }
        trigger="click"
        visible={(isGetProblemsLoading || isGetProblemsSuccess) && popoverVisible}
        onVisibleChange={(visible) => {
          setPopoverVisible(visible);
        }}
        placement="bottomLeft"
      >
        <Search
          size="small"
          placeholder="搜索题目，编号或内容"
          onSearch={(val, event) => {
            onShowAllProblems(val);
          }}
          onChange={(e) => {
            setSearchVal(e.target.value);
          }}
          enterButton={<SearchEnterBtn />}
          allowClear
          style={searchStyle}
        />
      </Popover>
    </HeaderSearchSection>
  );
};

export default HeaderLeftContent;
