import { Toast } from "antd-mobile";

export function copyTextToClipboard(text: string) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    // 使用 Clipboard API
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("copy success");
        Toast.clear();
        Toast.show({ content: "copy success", position: "center" });
      })
      .catch((err) => {
        console.error("copy error: ", err);
        Toast.clear();
        Toast.show({ content: "copy error", position: "center" });
      });
  } else {
    // 使用传统的 execCommand 方法
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // 防止页面滚动时 textarea 也跟着滚动
    textarea.style.left = "-9999px"; // 将 textarea 移出视口
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    Toast.clear();
    Toast.show({ content: "copy success", position: "center" });
  }
}

export async function delay(time = 1000) {
  return new Promise((resolve: any) => {
    const dtimer = setTimeout(() => {
      resolve();
      clearTimeout(dtimer);
    }, time);
  });
}