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
            group: '会员中心',
            items: [
                { name: '个人用户管理',       href: '个人用户管理.html' },
                { name: '企业用户管理',     href: '企业用户管理.html' }
            ]
        },
        {
            group: '数字艺术品管理',
            items: [
                { name: '数字艺术品管理',     href: '数字艺术品管理.html' },
            ]
        },
        {
            group: '订单与商品管理',
            items: [
                { name: '零售市场订单',       href: '零售市场订单.html' },
                { name: '批发市场订单',       href: '批发市场订单.html' },
                { name: '寄售详情管理',       href: '寄售详情管理.html' },
                { name: '产品详情管理',       href: '产品详情管理.html' },
                { name: '产品分账管理',       href: '产品分账管理.html' }
            ]
        },
        {
            group: '平台账户管理',
            items: [
                { name: '平台账户',       href: '平台账户.html' }
            ]
        },
        {
            group: '分账提现管理',
            items: [
                { name: '批发市场分账审核',   href: '批发市场分账审核.html' },
                { name: '冻结金分账申请审核', href: '冻结金分账申请审核.html' },
                { name: '批发资金提现审核',   href: '批发资金提现审核.html' },
                { name: '平台产品销售报表',   href: '平台产品销售报表.html' }
            ]
        },
        {
            group: '系统配置',
            items: [
                { name: '批发商菜单管理',     href: '批发商菜单管理.html' },
                { name: '业务参数配置',       href: '业务参数配置.html' },
                { name: '区块链服务管理',     href: '区块链服务管理.html' },
                { name: '钱包后台',           href: 'wallet-admin.html' }
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