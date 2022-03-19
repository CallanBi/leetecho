import to from 'await-to-js';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import { PathLike } from 'original-fs';
import path from 'path';
import os from 'os';

class FileTools {
  async readFolderFilesName(dirPath: string): Promise<string[]> {
    this.mkdirPath(dirPath);
    const [err, files] = await to(fse.readdir(dirPath, { withFileTypes: true }));
    if (err) {
      throw err;
    }
    return files?.map((file) => file.name) || [];
  }

  readFile(filePath: PathLike | number, encoding: BufferEncoding = 'utf8'): string {
    try {
      return fs.readFileSync(filePath, { encoding });
    } catch (_) {
      return '';
    }
  }

  writeFile(filePath: PathLike | number, content: string): void {
    fse.writeFileSync(filePath, content);
  }

  copyFiles(src: string, output: string): void {
    fse.copySync(src, output);
  }

  // judge whether the folder exists, if not, create it
  mkdirPath(pathStr: string): void {
    const delimiter = path.sep;
    // let projectPath = path.join(process.cwd());
    const tempDirArray = pathStr.split(delimiter);
    let tempDir = '';
    for (let i = 0; i < tempDirArray.length; i++) {
      tempDir = tempDir + tempDirArray[i] + delimiter;
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
    }
  }

  // judge whether the files in the folder exists, if not, create both files and folder
  createFilesInDir(
    dirPath: string,
    files: {
      fileNameWithFileType: string;
      content: string;
    }[],
  ): void {
    this.mkdirPath(dirPath);
    files.forEach((file) => {
      if (!fs.existsSync(path.join(dirPath, file.fileNameWithFileType))) {
        this.writeFile(path.join(dirPath, file.fileNameWithFileType), file.content);
      }
    });
  }

  // Force mode, if the file exists, still rewrite it
  createFilesInDirForced(
    dirPath: string,
    files: {
      fileNameWithFileType: string;
      content: string;
    }[],
  ): void {
    this.mkdirPath(dirPath);
    files.forEach((file) => {
      this.writeFile(path.join(dirPath, file.fileNameWithFileType), file.content);
    });
  }
}

const fileTools = new FileTools();

export default fileTools;
