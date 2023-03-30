// タブ表示
function openTab(evt, tabName) {
    // タブのコンテンツをすべて非表示にする
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // タブボタンのアクティブ状態を解除する
    tablinks = document.getElementsByClassName("tab-item");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // 選択されたタブのコンテンツを表示する
    document.getElementById(tabName).style.display = "block";
    // クリックされたタブをアクティブ状態にする
    evt.currentTarget.className += " active";
}