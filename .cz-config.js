module.exports = {
  types: [
    { value: 'init', name: 'init:     初始提交' },
    { value: 'feat', name: 'feat:     增加新功能' },
    { value: 'fix', name: 'fix:      修复bug' },
    { value: 'ui', name: 'ui:       更新UI' },
    { value: 'refactor', name: 'refactor: 代码重构' },
    { value: 'release', name: 'release:  发布' },
    { value: 'deploy', name: 'deploy:   部署' },
    { value: 'docs', name: 'docs:     修改文档' },
    { value: 'test', name: 'test:     增删测试' },
    { value: 'chore', name: 'chore:    更改配置文件' },
    { value: 'style', name: 'style:    样式修改不影响逻辑' },
    { value: 'revert', name: 'revert:   版本回退' },
    { value: 'add', name: 'add:      添加依赖' },
    { value: 'minus', name: 'minus:    版本回退' },
    { value: 'del', name: 'del:      删除代码/文件' }
  ],
  // 步骤
  messages: {
    type: '请选择提交的类型',
    customScope: '请输入修改的范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确认要使用以上信息提交? (y/n)'
  },
  // 跳过步骤
  skipQuestions: ['body', 'footer'],
  // 默认长度 72
  subjectLimit: 72
}
