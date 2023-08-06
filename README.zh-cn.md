# Imken.link 短链接项目

[![License](https://img.shields.io/badge/license-AGPL--3.0-blue)](https://www.gnu.org/licenses/agpl-3.0.html)

**注意：项目正在开发中，功能可能不稳定，存在尚未修复的 bug。**

## 简介

Imken.link 短链接项目是一个用于生成短链接的工具，主要面向私人使用。它提供了基本的短链接生成和管理功能，以及未来计划的一些扩展功能。

已实现功能：

- [X] 创建/删除短链接

计划中功能：

- [ ] 通过 API 调用生成短链接
- [ ] 多用户和权限管理
- [ ] 一键部署（Railways）

## 构建和部署

在构建和部署项目之前，需要进行一些配置和设置环境变量。以下是基本的构建和部署步骤：

1. 配置环境变量：请参考下面的「开发」章节，设置必要的环境变量。

2. 构建和部署：可以参考项目根目录下的 `build.sh` 脚本，执行构建和部署操作。通常情况下，你可以使用 `nixpack` 进行打包。

运行服务器：

```bash
uvicorn main:app --host <host> --port <port>
```

## 开发

在进行开发之前，需要设置一些环境变量以便正确运行项目。以下是开发所需的一些步骤：

1. 设置环境变量：在开发之前，确保设置以下环境变量，以连接到 PostgreSQL 数据库和进行其他必要的配置。

   - `PGSQL_URL`*：连接到 PostgreSQL 数据库的 URL。
   - `SETUP_KEY`：首次安装时用于创建用户的校验密钥（仅限一次使用），留空则会随机生成并在标准输出中显示。
   - `VITE_SITE_NAME`*：如果需要构建前端的话，请将这个变量填写为你的网站名称。

2. 安装依赖：

```bash
pip install -r requirements.txt
```

3. 运行开发服务器（支持热重载）：

```bash
uvicorn main:app --reload
```

## 许可证

本项目基于 AGPL-3.0 许可证进行发布。如有闭源使用的需求，请直接联系作者获取许可。

## 子仓库

- 网页前端仓库：[imken-link-web](https://github.com/immccn123/imken-link-web)
