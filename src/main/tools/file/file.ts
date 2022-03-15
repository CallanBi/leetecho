import to from 'await-to-js';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import { PathLike } from 'original-fs';

class FileTools {
  async readFolderFilesName(dirPath: PathLike): Promise<string[]> {
    const [err, files] = await to(fse.readdir(dirPath, { withFileTypes: true }));
    if (err) {
      throw err;
    }
    return files.map((file) => file.name);
  }

  readFile(filePath: PathLike | number, encoding: BufferEncoding = 'utf8'): string {
    return fs.readFileSync(filePath, { encoding });
  }

  writeFile(filePath: PathLike | number, content: string): void {
    fse.writeFileSync(filePath, content);
  }

  copyFiles(src: string, output: string): void {
    fse.copySync(src, output);
  }
}

const fileTools = new FileTools();

export default fileTools;
