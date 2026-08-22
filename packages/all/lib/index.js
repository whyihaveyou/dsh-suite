// DSH All-in-One —— meta-package 聚合包运行时入口。
//
// 这个包本身不提供任何运行时能力：全部能力来自 dependencies 里的第一方
// 子插件（plugin-manager / plugin-notify / plugin-session-export /
// plugin-team-board / plugin-deus / preset-center / themes），
// 由 cordis.patch.yml 的 insert 声明逐行激活。
//
// 本文件仅作为完整 bundle 的入口标记存在，让 Loader 能以统一模块解析
// "@dsh-suite/all"。patch 不 insert 本包自身（它只是"拉依赖 + 声明配置层"
// 的载体），只 insert 七个子插件行。
export const name = 'dsh-suite-all'

export function apply(_ctx) {
  // 聚合包无自身逻辑；子插件各自的 apply 承担全部工作。
}
