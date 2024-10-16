import { exec } from "node:child_process"

interface ExecGitDiff {
  baseFilePath: string
  targetFilePath: string
}

/**
 * とある2つのファイルの差分をgit diffで取得
 */
export const execGitDiff = ({ baseFilePath, targetFilePath }: ExecGitDiff) =>
  new Promise<string>((resolve, reject) => {
    const command = `git diff --word-diff-regex='[^[:space:]]' --unified=9999 --no-index ${baseFilePath} ${targetFilePath}`

    // docker container内で実行する場合の文字化け回避
    // const command = `git diff --word-diff-regex=$'[^\x80-\xbf][\x80-\xbf]*' --unified=9999 --no-index ${baseFilePath} ${targetFilePath}`

    console.log(command)
    exec(command, (error, stdout, stderr) => {
      if (error && stderr) reject(stderr)
      resolve(stdout)
    })
  })
