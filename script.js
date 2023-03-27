// 全データ消去ボタンが押された場合の処理
function deleteData() {
    const isConfirm = window.confirm("全てのデータを消去してよろしいですか？");
    if (isConfirm) {
        localStorage.clear(); // ローカルストレージのデータを削除する
        showRecords();
    }
}

// 消去ボタンが押された場合の処理（フォームをクリアする関数）
function clearForm() {
    const inputIds = ["exercise-input", "weight-input", "reps-input"];
    inputIds.forEach((id) => (document.getElementById(id).value = ""));
}

// ローカルストレージからデータを取得する関数
function getLocalRecords() {
    return JSON.parse(localStorage.getItem("records")) || [];
}

// ローカルストレージにデータを保存する関数
function setLocalRecords(records) {
    localStorage.setItem("records", JSON.stringify(records));
}

// 記録を表示するための関数
function showRecords() {
    const records = getLocalRecords(); // ローカルストレージから保存済みの記録を取得
    const tableBody = document.getElementById("recordsTableBody"); // 表示するテーブルボディの要素を取得
    tableBody.innerHTML = ""; // テーブルボディの中身を空にする
    // 記録を1つずつテーブルに追加
    records.forEach((record) => {
        const row = tableBody.insertRow();
        ["date", "exercise", "weight", "reps"].forEach((key) => {
            const cell = row.insertCell();
            cell.innerHTML = record[key];
        });
    });
}

// 保存ボタンが押された場合の処理（記録を保存するための関数）
function saveRecord() {
    // フォームから入力値を取得
    const exercise = document.getElementById("exercise-input").value;
    const weight = document.getElementById("weight-input").value;
    const reps = document.getElementById("reps-input").value;
    // 入力に空欄がある場合は何もしない
    if ([exercise, weight, reps].some((input) => input === "")) return;
    // ローカルストレージに保存するためのオブジェクトを作成
    const record = {
        date: new Date().toLocaleDateString(), // 日付を取得
        exercise,
        weight,
        reps,
    };
    // ローカルストレージから保存済みの記録を取得
    const records = getLocalRecords();
    // 新しい記録を追加
    records.push(record);
    // 更新後の記録をローカルストレージに保存
    setLocalRecords(records);
    // 記録を表示するための関数を呼び出し
    showRecords();
    // 入力フォームの値を消す
    clearForm();
}

// グラフの表示関数
function drawChart() {
    // ローカルストレージから保存された記録を取得する
    const records = JSON.parse(localStorage.getItem("records")) || [];

    // 運動種目ごとに合計重量と合計回数を計算する
    const exercises = records.reduce((acc, record) => {
        const { exercise, weight, reps } = record;
        if (!acc[exercise]) {
            acc[exercise] = { weight: 0, reps: 0 };
        }
        acc[exercise].weight += parseInt(weight);
        acc[exercise].reps += parseInt(reps);
        return acc;
    }, {});

    // グラフ用のデータを作成する
    const data = {
        labels: Object.keys(exercises),
        datasets: [
            {
                label: "合計重量",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: Object.values(exercises).map((exercise) => exercise.weight),
            },
            {
                label: "合計回数",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
                hoverBorderColor: "rgba(54, 162, 235, 1)",
                data: Object.values(exercises).map((exercise) => exercise.reps),
            },
        ],
    };

    // グラフを表示する
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
        type: "bar",
        data,
    });
}

// ページを読み込んだときに表示するように設定
window.onload = function () {
    showRecords();
    drawChart();
};