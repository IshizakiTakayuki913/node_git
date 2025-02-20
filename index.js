async function postData(data){

  try {
    const response = await fetch(`${this.location.href}rotes/`,{
        method: "POST",
        body: JSON.stringify({a:214103,b:"石﨑貴之"}),
    });
    if (response.ok) {
        const datas = await response.json();
        console.log(datas)
    } else {
        alert('正常なレスポンスではありません');
    }
  } catch {
    alert('通信上の問題が発生しています');
  }
}

// const ans = document.getElementById("ans")
// ans.addEventListener("click", postData)
window.addEventListener("load", (event) => {
  console.log("ページが完全に読み込まれました");
  const ans = document.getElementById('ans')
  ans.addEventListener("click", (e) => {
      postData()
  })
});