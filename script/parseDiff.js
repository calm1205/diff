import { lines } from "./diff.dummy.js";

const parseDiff = (lines) => {
  const originalFile = [];
  const modifiedFile = [];

  lines.forEach((line) => {
    if (line.startsWith("-")) {
      // '-' 行は元のファイルにのみ存在する
      originalFile.push(line.slice(1).trim()); // '-' を取り除いて、元のファイルに追加
      modifiedFile.push(""); // 変更後のファイルには空行を入れる
    } else if (line.startsWith("+")) {
      // '+' 行は変更後のファイルにのみ存在する
      originalFile.push(""); // 元のファイルには空行を入れる
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
