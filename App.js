import React, { useEffect, useRef, useState } from "react";
import NN from "./core/neuralNetwork";
import IP from "./utils/imageProcessor";

const W = 560;
const H = 280;

export default function App() {
  const canvasRef = useRef(null);
  const [net, setNet] = useState(null);
  const [trainSet, setTrainSet] = useState(null);
  const [testSet, setTestSet] = useState(null);
  const [progress, setProgress] = useState(0);
  const [acc, setAcc] = useState(null);
  const [pred, setPred] = useState(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    setNet(new NN(784, 200, 10, 0.1));
    canvasRef.current?.getContext("2d").fillRect(0, 0, W, H);
  }, []);

  const loadCSV = (file, setter) => {
    const r = new FileReader();
    r.onload = (e) =>
      setter(
        e.target.result
          .split("\n")
          .filter(Boolean)
          .map((l) => {
            const v = l.split(",").map(Number);
            return {
              label: v[0],
              inputs: v.slice(1).map((x) => (x / 255) * 0.99 + 0.01),
            };
          })
      );
    r.readAsText(file);
  };

  const train = async () => {
    if (!net || !trainSet) return;
    const epochs = 5;
    for (let e = 0; e < epochs; e++) {
      for (let i = 0; i < trainSet.length; i++) {
        const t = Array(10).fill(0.01);
        t[trainSet[i].label] = 0.99;
        net.train(trainSet[i].inputs, t);
        if (i % 100 === 0) {
          setProgress(
            Math.round(
              ((e * trainSet.length + i) / (epochs * trainSet.length)) * 100
            )
          );
          await new Promise((r) => setTimeout(r, 0));
        }
      }
    }
    setProgress(100);
  };

  const test = () => {
    if (!net || !testSet) return;
    let correct = 0;
    testSet.forEach((r) => {
      const o = net.query(r.inputs);
      if (o.indexOf(Math.max(...o)) === r.label) correct++;
    });
    setAcc(((correct / testSet.length) * 100).toFixed(2));
  };

  const recognize = () => {
    if (!net) return;
    const segs = IP.segment(canvasRef.current);
    if (!segs.length) return;

    setPred(
      segs
        .map((s) => {
          const m = IP.toMNIST(canvasRef.current, s);
          if (!m) return "";
          const o = net.query(IP.getPixels(m));
          return o.indexOf(Math.max(...o));
        })
        .join("")
    );
  };

  const clear = () => {
    canvasRef.current.getContext("2d").fillRect(0, 0, W, H);
    setPred(null);
  };

  const draw = (e) => {
    if (!drawing && e.type !== "mousedown") return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext("2d");
    const x = ((e.clientX - rect.left) * W) / rect.width;
    const y = ((e.clientY - rect.top) * H) / rect.height;

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <>
      <h1>MNIST Recognition</h1>

      <input
        type="file"
        onChange={(e) => loadCSV(e.target.files[0], setTrainSet)}
      />
      <button onClick={train} disabled={!trainSet}>
        Train
      </button>
      {progress > 0 && (
        <div
          style={{ width: `${progress}%`, height: 6, background: "#4caf50" }}
        />
      )}

      <input
        type="file"
        onChange={(e) => loadCSV(e.target.files[0], setTestSet)}
      />
      <button onClick={test} disabled={!testSet}>
        Test
      </button>
      {acc && <p>{acc}%</p>}

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onMouseDown={(e) => {
          setDrawing(true);
          draw(e);
        }}
        onMouseMove={draw}
        onMouseUp={() => setDrawing(false)}
        onMouseLeave={() => setDrawing(false)}
      />

      <button onClick={clear}>Clear</button>
      <button onClick={recognize}>Recognize</button>

      {pred && <p>{pred}</p>}
    </>
  );
}
