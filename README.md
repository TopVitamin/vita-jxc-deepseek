<p align="center">
  <h1 align="center">维他进销存 · Vita JXC</h1>
  <p align="center">一个企业级进销存（ERP）管理系统前端，基于 React + TypeScript + Tailwind CSS 构建</p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
</p>

---

> 📄 本项目由 AI 辅助生成，完整的生成提示词见 [prompt.md](./prompt.md)

## 项目简介

**维他进销存** 是一套面向中小型商贸企业的进销存管理系统前端界面，覆盖采购、销售、库存、基础数据、系统设置等核心业务模块，共 **20+ 个功能页面**。项目以内置 Mock 数据驱动，无需后端即可完整体验所有业务流程。

项目采用 B2B 企业级 UI 风格，界面简洁专业，交互流畅。所有页面均支持完整的 CRUD 操作、多条件筛选、表单校验、详情抽屉查看、状态流转和操作确认。

## 功能模块

| 模块 | 页面 | 说明 |
|------|------|------|
| **基础数据** | 供应商管理 · 客户管理 · 商品管理 · 仓库管理 · 门店管理 | 核心主数据维护，支持分类、区域、结算方式等多维度筛选 |
| **采购管理** | 采购订单 · 采购入库 · 供应商退货 | 完整采购流程：下单→审核→入库→退货，支持订单行项目管理 |
| **销售管理** | 销售订单 · 销售出库 · 客户退货 | 完整销售流程：下单→审核→出库→退货，记录物流信息 |
| **库存管理** | 库存查询 · 库存流水 · 库存调拨 · 库存调整 | 实时库存查询、出入库流水追踪、仓库间调拨、盘盈盘亏处理 |
| **系统设置** | 用户管理 · 角色管理 · 菜单管理 · 数据字典 | 用户权限体系、菜单导航配置、系统枚举值管理 |
| **首页看板** | 经营仪表盘 | 今日销售额/采购额、SKU 概览、销售采购趋势图、待办事项 |

## 技术栈

| 类别 | 技术 | 说明 |
|------|------|------|
| 框架 | React 18 + TypeScript | 函数组件 + Hooks，严格类型约束 |
| 构建 | Vite 5 | 极速开发体验，HMR 热更新 |
| 样式 | Tailwind CSS 3 | 实用优先的原子化 CSS，自建组件体系 |
| 路由 | React Router v6 | 嵌套路由 + 路由守卫（ProtectedRoute） |
| 状态 | Zustand | 轻量级全局状态（认证信息） |
| 表单 | React Hook Form | 高性能表单校验与提交 |
| 图表 | Recharts | 首页看板趋势图 |
| 图标 | Lucide React | 统一图标库 |
| Mock | 内置 Mock API | `createCrudApi<T>` 通用工厂，300ms 模拟延迟 |

## 快速开始

```bash
# 克隆项目
git clone https://github.com/your-username/vita-jxc.git
cd vita-jxc

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

启动后浏览器访问 `http://localhost:5173`，使用以下账号登录：

- 账号：`admin`
- 密码：`123456`

## 项目结构

```
vita-jxc/
├── index.html
├── package.json
├── vite.config.ts              # Vite 配置 + @ 路径别名
├── tailwind.config.js          # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
└── src/
    ├── main.tsx                # 应用入口
    ├── App.tsx                 # 路由配置 + 布局
    ├── index.css               # 全局样式 + Tailwind 指令
    ├── types/
    │   └── index.ts            # 全部 TypeScript 类型定义
    ├── stores/
    │   └── authStore.ts        # Zustand 认证状态管理
    ├── utils/
    │   ├── constants.ts        # 侧边栏菜单配置
    │   ├── format.ts           # 格式化工具（日期、金额）
    │   └── useCrudPage.ts      # CRUD 页面通用 Hook
    ├── mock/
    │   ├── api.ts              # 通用 CRUD Mock API 工厂 + 各业务 API
    │   └── data.ts             # 全量 Mock 数据集
    ├── components/
    │   ├── common/             # 通用业务组件
    │   │   ├── PageHeader      # 页面标题栏
    │   │   ├── SearchPanel     # 搜索筛选面板
    │   │   ├── DataTable       # 数据表格（分页、排序）
    │   │   ├── StatusBadge     # 状态标签
    │   │   ├── FormDialog      # 表单弹窗
    │   │   ├── DetailDrawer    # 详情侧边抽屉
    │   │   └── ConfirmDialog   # 操作确认弹窗
    │   └── layout/             # 布局组件
    │       ├── Header          # 顶部导航栏
    │       ├── Sidebar         # 侧边栏菜单
    │       └── Breadcrumb      # 面包屑导航
    ├── layouts/
    │   ├── MainLayout.tsx      # 主布局（侧边栏 + 顶栏 + 内容区）
    │   └── AuthLayout.tsx      # 认证布局（登录/注册页）
    └── pages/
        ├── auth/               # 登录 · 注册
        ├── dashboard/          # 首页看板
        ├── master-data/        # 供应商 · 客户 · 商品 · 仓库 · 门店
        ├── purchase/           # 采购订单 · 采购入库 · 供应商退货
        ├── sales/              # 销售订单 · 销售出库 · 客户退货
        ├── inventory/          # 库存查询 · 库存流水 · 库存调拨 · 库存调整
        └── system/             # 用户 · 角色 · 菜单 · 数据字典
```

## 设计特点

### 通用 CRUD Hook

`useCrudPage<T>` 将分页、搜索、筛选、新增、编辑、删除等通用逻辑抽象为单一 Hook，各业务页面只需传入对应的 API 实例即可获得完整的 CRUD 能力，大幅减少重复代码。

### Mock API 工厂

`createCrudApi<T>` 是一个泛型 Mock API 工厂函数，接收数据集和搜索字段配置，自动生成带筛选、分页、模糊搜索、延迟模拟的完整 CRUD 接口，支持按关键词、状态、日期范围、数值区间等多维度筛选。

### 通用组件体系

| 组件 | 功能 |
|------|------|
| `PageHeader` | 页面标题 + 描述 + 操作按钮区 |
| `SearchPanel` | 多条件筛选栏，支持关键词、下拉、日期范围、数值区间 |
| `DataTable` | 通用数据表格，支持列配置、分页、加载态 |
| `StatusBadge` | 文档状态 / 启用状态的彩色标签 |
| `FormDialog` | 可配置宽度的模态表单弹窗 |
| `DetailDrawer` | 右侧滑出详情面板，宽度可配置 |
| `ConfirmDialog` | 危险操作二次确认弹窗 |

### 状态流转

核心单据（采购订单、销售订单、调拨单、调整单）均实现完整的状态机流转：

```
草稿 → 待审核 → 已审核 → 已关闭/已作废
```

不同状态下展示对应的操作按钮（提交审核、审核通过、反审核、关闭、删除），关键操作均弹出确认提示。

## 浏览器支持

支持所有现代浏览器的最新两个版本：Chrome、Firefox、Safari、Edge。

## License

[MIT](LICENSE)

---

<p align="center">
  <sub>Built with ❤️ using React + TypeScript + Tailwind CSS</sub>
</p>
