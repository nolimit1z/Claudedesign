# iFlow CLI 安装指南

## 安装步骤

### 方法 1：使用 uipro CLI 安装（推荐）

```bash
# 安装 uipro CLI（如果尚未安装）
npm install -g uipro-cli

# 进入你的项目目录
cd /path/to/your/project

# 安装 UI/UX Pro Max 到 iFlow CLI
uipro init --ai iflow
```

### 方法 2：手动安装

1. 复制以下目录结构到你的项目：
```
.iflow/
├── skills/
│   └── ui-ux-pro-max/
│       ├── SKILL.md
│       ├── data/ (所有 CSV 文件)
│       └── scripts/ (所有 Python 脚本)
└── commands/
    └── ui-ux-pro-max.md
```

2. 重启 iFlow CLI

## 使用方法

### 使用技能（自动激活）

当你在 iFlow CLI 中请求 UI/UX 工作时，技能会自动激活：

```
> 帮我设计一个 SaaS 产品的着陆页
```

### 使用 Sub Command（快捷访问）

使用 `/ui-ux-pro-max` 命令快速访问功能：

```
> /ui-ux-pro-max 生成一个医疗健康应用的完整设计系统
```

## 验证安装

检查以下内容是否正确安装：

```bash
# 检查技能文件
ls -la .iflow/skills/ui-ux-pro-max/SKILL.md

# 检查数据文件
ls -la .iflow/skills/ui-ux-pro-max/data/

# 检查脚本文件
ls -la .iflow/skills/ui-ux-pro-max/scripts/

# 检查命令文件
ls -la .iflow/commands/ui-ux-pro-max.md
```

## 直接使用 Python 脚本

你也可以直接运行搜索脚本：

```bash
# 生成设计系统
python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness" --design-system -p "Serenity Spa"

# 搜索特定领域
python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style
python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "elegant serif" --domain typography

# 获取栈特定指南
python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "responsive layout" --stack html-tailwind
```

## 故障排除

### Python 未安装

确保 Python 3.x 已安装：

```bash
python3 --version
```

### 技能未激活

1. 检查 `.iflow/skills/ui-ux-pro-max/SKILL.md` 文件是否存在
2. 重启 iFlow CLI
3. 使用 `/help` 查看可用命令

### 命令不可用

1. 检查 `.iflow/commands/ui-ux-pro-max.md` 文件是否存在
2. 重启 iFlow CLI
3. 使用 `/commands list` 查看已安装的命令