export default class ImageProcessor {
  static segment(canvas) {
    const ctx = canvas.getContext("2d");
    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const proj = new Array(canvas.width).fill(0);

    for (let x = 0; x < canvas.width; x++)
      for (let y = 0; y < canvas.height; y++)
        if (d[(y * canvas.width + x) * 4] > 128) proj[x]++;

    const segs = [];
    let inDigit = false,
      start = 0;

    for (let x = 0; x < canvas.width; x++) {
      if (!inDigit && proj[x] > 5) {
        start = Math.max(0, x - 10);
        inDigit = true;
      } else if (inDigit && proj[x] <= 5) {
        let end = true;
        for (let l = 1; l < 15 && x + l < canvas.width; l++)
          if (proj[x + l] > 5) {
            end = false;
            break;
          }
        if (end) {
          const e = Math.min(canvas.width, x + 10);
          if (e - start > 15) segs.push({ start, end: e });
          inDigit = false;
        }
      }
    }
    if (inDigit) segs.push({ start, end: canvas.width });
    return segs;
  }

  static toMNIST(canvas, seg) {
    const w = seg.end - seg.start;
    const sc = document.createElement("canvas");
    sc.width = w;
    sc.height = canvas.height;
    const sctx = sc.getContext("2d");
    sctx.drawImage(
      canvas,
      seg.start,
      0,
      w,
      canvas.height,
      0,
      0,
      w,
      canvas.height
    );

    const sd = sctx.getImageData(0, 0, w, canvas.height).data;
    let minX = w,
      maxX = 0,
      minY = canvas.height,
      maxY = 0;

    for (let y = 0; y < canvas.height; y++)
      for (let x = 0; x < w; x++)
        if (sd[(y * w + x) * 4] > 50) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }

    if (maxX <= minX || maxY <= minY) return null;

    const cw = maxX - minX + 1,
      ch = maxY - minY + 1;
    const scale = 20 / Math.max(cw, ch);
    const sw = Math.round(cw * scale),
      sh = Math.round(ch * scale);

    const mc = document.createElement("canvas");
    mc.width = 28;
    mc.height = 28;
    const mctx = mc.getContext("2d");
    mctx.fillStyle = "black";
    mctx.fillRect(0, 0, 28, 28);
    mctx.imageSmoothingEnabled = true;
    mctx.imageSmoothingQuality = "high";
    mctx.drawImage(
      sc,
      minX,
      minY,
      cw,
      ch,
      Math.round((28 - sw) / 2),
      Math.round((28 - sh) / 2),
      sw,
      sh
    );
    return mc;
  }

  static getPixels(canvas) {
    const d = canvas.getContext("2d").getImageData(0, 0, 28, 28).data;
    const p = [];
    for (let i = 0; i < d.length; i += 4) p.push((d[i] / 255) * 0.99 + 0.01);
    return p;
  }
}
