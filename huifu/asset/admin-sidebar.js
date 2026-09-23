/* ============================================================
   原型风格 · 模块公用左侧目录栏  (admin-sidebar.js)
   ------------------------------------------------------------
   - 深艺交 · APP 端（huifu 根目录手机页面）共用这一份文件；
     各页面只做两行引用：head 的 css link + </body> 前的本 js；
   - 自动在页面左侧生成目录栏，并按当前文件名高亮菜单项；
   - 菜单项统一在下方 MENU 中维护（新增/删除只改这里）；
   - 依赖同目录 admin-sidebar.css 的样式。
   ============================================================ */
(function () {
    'use strict';

    /* ↓↓↓ 目录栏标题（展示在目录最上方，可按模块修改）↓↓↓ */
    var SIDEBAR_TITLE = '深艺交 · APP 端';

    /* ↓↓↓ 在此维护模块菜单（分组 + 条目，href 相对页面所在目录）↓↓↓ */
    var MENU = [
        {
            group: '我的',
            items: [
                { name: '我的页面',     href: '我的页面.html' },
                { name: '我的钱包',     href: '我的钱包.html' },
                { name: '提货记录',           href: '提货记录.html' },
                { name: '提货详情',           href: '提货详情.html' },
                { name: '我的产品',           href: '我的产品.html' },
            ]
        },
        {
            group: '批发市场',
            items: [
                { name: '批发市场支付',   href: '批发市场支付.html' },
                { name: '批发订单',       href: '批发订单.html' },
                { name: '批发订单详情',   href: '批发订单详情.html' },
            ]
        },
        {
            group: '挂单和共享超市',
            items: [
                { name: '持有产品详情',   href: '持有产品详情.html' },
                { name: '我的挂单',       href: '我的挂单.html' },
                { name: '零售市场列表',   href: '零售市场列表.html' },
                { name: '零售市场详情',   href: '零售市场详情.html' },
                { name: '零售市场支付',   href: '零售市场支付.html' },
                { name: '零售订单详情',   href: '零售订单详情.html' },
                { name: '我的卖单列表',   href: '我的卖单列表.html' },
                { name: '我的卖单详情',   href: '我的卖单详情.html' }
            ]
        },
        {
            group: '任务',
            items: [
                { name: '任务详情',           href: '任务详情.html' },
                { name: '提货页面',           href: '提货页面.html' },
                { name: '奖励列表',           href: '奖励列表.html' },
            ]
        }
    ];
    /* ↑↑↑ MENU 配置到此为止 ↑↑↑ */

    /* ↓↓↓ 供 index.html 目录总览读取本模块菜单数据（不影响各页面自动渲染）↓↓↓ */
    window.PROTO_MENUS = window.PROTO_MENUS || {};
    window.PROTO_MENUS.app = { title: SIDEBAR_TITLE, menu: MENU };

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
