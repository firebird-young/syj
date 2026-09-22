/* ============================================================
   原型风格 · 模块公用左侧目录栏  (admin-sidebar.js)
   ------------------------------------------------------------
   - 全模块共享这一份文件，各页面只做一行 <script> 引用；
   - 自动在页面左侧生成目录栏，并按当前文件名高亮菜单项；
   - 菜单项统一在下方 MENU 中维护（新增/删除只改这里）；
   - href 写本模块页面文件名（相对模块目录，即本文件的上一级目录）；
   - 依赖同目录 admin-sidebar.css 的样式。
   ============================================================ */
(function () {
    'use strict';

    /* ↓↓↓ 目录栏标题（展示在目录最上方，可按模块修改）↓↓↓ */
    var SIDEBAR_TITLE = '深艺交 · 批发商工作台';

    /* ↓↓↓ 在此维护模块菜单（分组 + 条目）↓↓↓ */
    var MENU = [
        {
            /* 备注：登录/注册为未登录页入口，位置与分组可按需调整 */
            group: '账号（非菜单）',
            items: [
                { name: '登录', href: '登录.html' },
                { name: '注册', href: '注册.html' },
                { name: '企业认证', href: '企业认证.html' }
            ]
        },
        {
            group: '信息查看',
            items: [
                { name: '信息查看',     href: '信息查看.html' },
            ]
        },
         {
            group: '产品管理',
            items: [
                { name: '我的产品',     href: '产品管理.html' },
                { name: '产品详情管理', href: '产品详情管理.html' },
            ]
        },
        {
            group: '账户资金管理',
            items: [
                { name: '我的资产(原宝付对应的功能，只针对老的批发商保留数据和菜单，新的批发商不展示)',           href: '#' },
                { name: '账户管理',           href: '账户管理.html' },
                { name: '批发市场分账申请',   href: '批发市场分账申请.html' },
                { name: '固定风险保证金分账申请', href: '固定风险保证金分账申请.html' }
            ]
        },
        {
            group: '运营管理',
            items: [
                { name: '任务管理', href: '任务管理.html' },
                { name: '运营数据统计', href: '原功能页面.html' }
            ]
        },
        {
            group: '价值管理',
            items: [
                { name: '价值注入', href: '原功能页面.html' },
                { name: '价值字典', href: '原功能页面.html' }
            ]
        },
        {
            group: '仓管管理',
            items: [
                { name: '发货管理', href: '发货管理.html' }
            ]
        },
        {
            group: '系统管理',
            items: [
                { name: '用户管理',       href: '用户管理.html' },
                { name: '角色管理',       href: '角色管理.html' },
                { name: '区块链服务管理', href: '区块链服务.html' },
                { name: '系统公告',     href: '原功能页面.html' }
            ]
        }
    ];
    /* ↑↑↑ MENU 配置到此为止 ↑↑↑ */

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
