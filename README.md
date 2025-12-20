# Vue Action -  vue3 +vite + ts项目的基础建设框架

## 📖 项目介绍

Vue Action 是一个基于 Vue 3 + TypeScript + Vite 构建基础架子，提供了完善的开发环境和代码规范配置，帮助开发者快速搭建和开发 Vue 3 应用。

## 🛠 技术栈

- **前端框架**: Vue 3.4.31
- **构建工具**: Vite 5.3.3
- **状态管理**: Pinia 2.1.7
- **路由管理**: Vue Router 4.4.0
- **开发语言**: TypeScript 5.5.3
- **代码规范**: ESLint 9.7.0 + Prettier + Stylelint 16.26.1 + CSpell 8.10.4
- **提交规范**: Commitizen + CZ-Git + Commitlint
- **Git Hooks**: Husky 9.0.11

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- PNPM >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 📁 项目结构

```
├── src/                    # 源码目录
│   ├── assets/            # 静态资源
│   ├── components/        # 组件
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   └── style.css          # 全局样式
├── public/                 # 公共资源
├── .husky/                # Husky Git Hooks 配置
├── .vscode/               # VS Code 配置
├── eslint.config.js       # ESLint 配置
├── stylelint.config.js    # Stylelint 配置
├── commitlint.config.js   # Commitlint 配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
└── package.json           # 项目配置
```

## 📝 代码规范

### ESLint 规范

项目使用 ESLint 结合 TypeScript ESLint 和 Vue ESLint 插件，确保 JavaScript/TypeScript 和 Vue 组件代码质量。

#### 主要规则：
- 强制导入/导出排序
- Vue 组件推荐配置
- TypeScript 推荐配置

### Stylelint 规范

项目使用 Stylelint 确保 CSS/SCSS 代码质量。

#### 主要规则：
- 推荐 Vue 配置
- 允许的单位列表：`em`, `rem`, `%`, `s`, `px`, `vh`, `vw`, `deg`, `ms`

### 拼写检查

使用 CSpell 进行代码拼写检查，确保变量名、函数名等的拼写正确。

### 格式化工具

项目配置了 Prettier，确保代码风格统一。

#### Prettier 配置

```json
{
    "arrowParens": "avoid",
    "endOfLine": "lf",
    "semi": false,
    "printWidth": 140,
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "none"
}
```

### 拼写检查

使用 CSpell 进行代码拼写检查，确保变量名、函数名等的拼写正确。

#### CSpell 配置

```json
{
  "import": ["@cspell/dict-lorem-ipsum/cspell-ext.json"],
  "caseSensitive": false,
  "dictionaries": ["custom-words"],
  "dictionaryDefinitions": [
    {
      "name": "custom-words",
      "path": "./.cspell/custom-words.txt",
      "addWords": true
    }
  ],
  "ignorePaths": [
    "**/node_modules/**",
    "**/dist/**",
    "**/lib/**",
    "**/docs/**",
    "**/stats.html",
    "**/languages/**",
    "**/languages.ts",
    "**/package.json",
    "**/MOCK_DATA.ts",
    "eslint.config.js",
    "**/*.md"
  ]
}
```

## ✅ 提交规范

项目使用 Commitizen + CZ-Git + Commitlint 确保提交信息规范。

### 提交类型

| 类型     | 描述                     | Emoji  |
| -------- | ------------------------ | ------ |
| feat     | 新功能                   | ✨     |
| fix      | 修复 bug                 | 🐛     |
| docs     | 文档变更                 | 📝     |
| style    | 代码样式变更             | 💄     |
| refactor | 代码重构                 | 📦️    |
| perf     | 性能优化                 | 🚀     |
| test     | 测试相关                 | 🚨     |
| build    | 构建系统或依赖变更       | 🛠     |
| ci       | CI 配置变更              | 🎡     |
| chore    | 其他不修改源码的变更     | 🔨     |
| revert   | 回退之前的提交           | ⏪️    |

### 提交方式

推荐使用交互式提交：

```bash
pnpm commit
```

也可以直接使用 git commit，但需遵循规范：

```bash
git commit -m "feat: 添加新功能"
```

## 📦 可用脚本

| 脚本命令         | 描述                           |
| ---------------- | ------------------------------ |
| `pnpm dev`       | 启动开发服务器                 |
| `pnpm build`     | 构建生产版本                   |
| `pnpm preview`   | 预览生产版本                   |
| `pnpm lint:es`   | 运行 ESLint 检查               |
| `pnpm lint:style`| 运行 Stylelint 检查            |
| `pnpm spellcheck`| 运行拼写检查                   |
| `pnpm commit`    | 交互式提交代码                 |

## 🛡️ Git Hooks

项目使用 Husky 配置了以下 Git Hooks：

- **pre-commit**: 提交前检查代码规范
- **commit-msg**: 检查提交信息格式

## 🔧 自定义配置

### 修改 ESLint 配置

编辑 `eslint.config.js` 文件。

### 修改 Stylelint 配置

编辑 `stylelint.config.js` 文件。

### 修改提交规范

编辑 `commitlint.config.js` 文件。

### 修改 TypeScript 配置

编辑 `tsconfig.json` 和 `tsconfig.app.json` 文件。

### 修改 Vite 配置

编辑 `vite.config.ts` 文件。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
 
  
---

**注意**: 本项目基于 Vite 创建，详细的架构设计和技术选型可参考 `note.md` 文件。