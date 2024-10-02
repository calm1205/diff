import { lines } from "./diff.dummy.js";

const parseDiff = (lines) => {
  const originalFile = [];
  const modifiedFile = [];

  let deletionCount = 0;
  let additionCount = 0;

  lines.forEach((line) => {
    if (line.startsWith("-")) {
      deletionCount++;
      // '-' 行は元のファイルにのみ存在する
      originalFile.push(line.slice(1).trim()); // '-' を取り除いて、元のファイルに追加
    } else if (line.startsWith("+")) {
      additionCount++;
      // '+' 行は変更後のファイルにのみ存在する
      if (additionCount > deletionCount) {
        originalFile.push(""); // 元のファイルには空行を入れる
        deletionCount = 0;
        additionCount = 0;
      }
      modifiedFile.push(line.slice(1).trim()); // '+' を取り除いて、変更後のファイルに追加
    } else {
      // 変更のない行は両方のファイルにそのまま追加
      originalFile.push(line.trim());
      modifiedFile.push(line.trim());
    }
  });

  return { originalFile, modifiedFile };
};

console.log(parseDiff(lines));
