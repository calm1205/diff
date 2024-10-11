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

    exec(command, (error, stdout, stderr) => {
      if (error && stderr) reject(stderr)
      resolve(stdout)
    })
  })
