/* ============================================================
   原型风格 · 模块公用左侧目录栏  (admin-sidebar.js)
   ------------------------------------------------------------
   - 全模块共享这一份文件，各页面只做一行 <script> 引用；
   - 自动在页面左侧生成目录栏，并按当前文件名高亮菜单项；
   - 菜单项统一在下方 MENU 中维护（新增/删除只改这里）；
   - 依赖同目录 admin-sidebar.css 的样式。
   ============================================================ */
(function () {
    'use strict';

    /* ↓↓↓ 目录栏标题（展示在目录最上方，可按模块修改）↓↓↓ */
    var SIDEBAR_TITLE = '深艺交 · 管理后台';

    /* ↓↓↓ 在此维护模块菜单（分组 + 条目，href 相对本文件所在目录）↓↓↓ */
    var MENU = [
         {
            group: '首页',
            items: [
                { name: '首页',       href: '原功能页面.html' },
            ]
        },
        {
            group: '认证管理',
            items: [
                { name: '个人用户审核',       href: '原功能页面.html' },
                { name: '企业用户审核',       href: '原功能页面.html' },
            ]
        },
         {
            group: '会员中心',
            items: [
                { name: '个人用户管理',       href: '个人用户管理.html' },
                { name: '企业用户管理',     href: '企业用户管理.html' },
                { name: '委托服务商（废弃功能，入口和数据展示保留）',     href: '#' }
            ]
        },
        {
            group: '数字艺术品管理',
            items: [
                { name: '数字艺术品管理',     href: '数字艺术品管理.html' },
                { name: '价值注入审核',     href: '价值注入审核.html' },
                { name: '价值管理',     href: '价值管理.html' }
            ]
        },
        {
            group: '订单产品管理',
            items: [
                { name: '零售市场订单',       href: '零售市场订单.html' },
                { name: '批发市场订单',       href: '批发市场订单.html' },
                { name: '挂单详情管理',       href: '挂单详情管理.html' },
                { name: '产品详情管理',       href: '产品详情管理.html' },
                { name: '产品分账管理',       href: '产品分账管理.html' }
            ]
        },
        {
            group: '平台账户管理',
            items: [
                { name: '平台账户',       href: '平台账户.html' },
                { name: '批发商账户（废弃功能，入口和数据展示保留）',       href: '#' }
            ]
        },
            {
            group: '仓库管理',
            items: [
                { name: '仓库列表',       href: '原功能页面.html' },
                { name: '发货管理（原实物提取管理）',       href: '发货管理.html' },
                { name: '货款提取审核（废弃功能，入口和数据展示保留）',       href: '#' },
                { name: '数字艺术品存储',       href: '原功能页面.html' },
              
            ]
        },
        {
            group: '分账提现管理',
            items: [
                { name: '批发市场分账审核',   href: '批发市场分账审核.html' },
                { name: '固定风险保证金分账审核', href: '固定风险保证金分账审核.html' },
                { name: '批发商提现审核',     href: '批发商提现审核.html' },
            ]
        },
        {
            group: '平台统计',
            items: [
                { name: '平台产品销售报表',   href: '平台产品销售报表.html' },
                { name: '财务日统计',   href: '原功能页面.html' },
                { name: '平台数据总汇',   href: '原功能页面.html' },
                { name: '上线服务费统计',   href: '原功能页面.html' }
            ]
        },
        {
            group: '报表推送',
            items: [
                { name: '推送记录',   href: '原功能页面.html' },
            ]
        },
        {
            group: '财务管理',
            items: [
                { name: '提现记录（废弃功能，入口和数据展示保留）',   href: '#' },
            ]
        },
        {
            group: '系统配置',
            items: [
                { name: '批发商菜单管理',     href: '批发商菜单管理.html' },
                { name: '业务参数配置',       href: '业务参数配置.html' },
                { name: '区块链服务管理',     href: '区块链服务管理.html' },
                { name: '钱包管理',           href: 'wallet-admin.html' },
                { name: 'Banner管理',     href: '原功能页面.html' },
                { name: 'app上架管理',       href: '原功能页面.html' },
                { name: '类型管理',     href: '原功能页面.html' },
                { name: '风险测评',           href: '原功能页面.html' },
                { name: '风控规则配置',     href: '原功能页面.html' },
                { name: '协议管理',           href: '原功能页面.html' }
            ]
        }
    ];
    /* ↑↑↑ MENU 配置到此为止 ↑↑↑ */

    /* ↓↓↓ 供 index.html 目录总览读取本模块菜单数据（不影响各页面自动渲染）↓↓↓ */
    window.PROTO_MENUS = window.PROTO_MENUS || {};
    window.PROTO_MENUS.admin = { title: SIDEBAR_TITLE, menu: MENU };

    function currentFile() {
        return decodeURIComponent(location.pathname.split('/').pop() || '').toLowerCase();
    }

    function render() {
        var cur = currentFile();
        var html = '<aside class="admin-sidenav">'
            + '<div class="sn-brand"><span class="sn-dot"></span>' + SIDEBAR_TITLE + '</div>';

        MENU.forEach(function (g) {
            html += '<div class="sn-group"><div class="sn-group-title">' + g.group + '</div>';
            g.items.forEach(function (it) {
                var target = it.href.split('/').pop().toLowerCase();
                var active = (target === cur) ? ' active' : '';
                html += '<a class="sn-item' + active + '" href="' + it.href + '">'
                    + '<span>' + it.name + '</span></a>';
            });
            html += '</div>';
        });
        html += '</aside>';

        document.body.insertAdjacentHTML('afterbegin', html);
        document.body.classList.add('has-sidenav');
    }

    /* index.html 目录总览：只读取菜单数据，不注入目录栏 */
    if (window.PROTO_NO_SIDEBAR) { return; }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();