/** index.js デフォルト */
'use strict';
{
  const PROJ_NAME = 'test-pong';
  const FILE_NAME = 'index.js';
  console.log(`${FILE_NAME} load start.`);

  (() => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('main');
    if (!canvas || !canvas.getContext) {
      const msg = 'Canvas does not exists. キャンバスが見つかりません。終了します。';
      console.error(msg);
      alert(msg);
      return;
    }

    // スタイル指定サイズ初期化
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    /** キャンバスのアスペクト比 */
    const aspect = canvas.width / canvas.height;
    /** bodyElement */
    const body = document.getElementById('body') || document.getElementsByTagName('body')[0];
    /** キャンバスサイズを画面サイズに合わせて拡大縮小(基本的に「全て見えない事が悪」と捉えて、縮小の方が優先度が高い) */
    const sizeScaling = () => {
      {
        const canvasStyleWidth = Number(canvas.style.width.replace('px', ''));
        if (window.innerWidth > canvasStyleWidth) {
          // 画面幅がキャンバスの幅を超えるなら、拡大するかも
          if (window.innerWidth < canvas.width) {
            // 画面幅がキャンバスの初期幅未満なら、キャンバス幅を画面幅まで拡大
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerWidth / aspect + 'px';
          } else if (window.innerWidth < canvas.width * 1.5) {
            // 画面幅がキャンバスの初期幅以上、初期幅の1.5倍未満なら、キャンバス幅を初期幅まで拡大
            canvas.style.width = canvas.width + 'px';
            canvas.style.height = canvas.height + 'px';
          } else {
            // 画面幅がキャンバスの初期幅の1.5倍を超えるなら、キャンバス幅を画面幅の1/1.5まで拡大
            canvas.style.width = window.innerWidth / 1.5 + 'px';
            canvas.style.height = window.innerWidth / 1.5 / aspect + 'px';
          }
        }
      }
      // 画面幅よりキャンバスが大きければ画面幅に合わせて縮小
      if (window.innerWidth < Number(canvas.style.width.replace('px', ''))) {
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerWidth / aspect + 'px';
      }
      // 画面高さよりキャンバスが大きければ画面高さに合わせて縮小
      if (window.innerHeight < Number(canvas.style.height.replace('px', ''))) {
        canvas.style.width = window.innerHeight * aspect + 'px';
        canvas.style.height = window.innerHeight + 'px';
      }
    };
    // ひとまず初期化呼び出し
    sizeScaling();
    // ウィンドウサイズ変更時に再度呼び出し
    window.addEventListener('resize', sizeScaling);

    /** ログエリア */
    const msgArea = document.getElementById('msg-area');
    /** @param {string} msg 指定文字列と日時情報を、コンソールとログエリアに出力する。 */
    const log = (msg) => {
      const date = new Date();
      console.log(date);
      console.trace(msg);
      const str = `${date.toISOString()}, ${msg}`;
      const p = document.createElement('p');
      p.insertAdjacentHTML('afterbegin', str);
      msgArea.insertAdjacentElement('beforeend', p);
    };

    /** キー押下管理 true ならば押されている */
    const pressed = {
      left: false,
      right: false,
      up: false,
      down: false,
      Z: false,
      X: false,
      C: false,
      V: false,
      SPACE: false,
      Enter: false,
    };

    /** キー押下状態変更(押下) */
    window.addEventListener('keydown', (ev) => {
      const key = ev.key;
      console.debug(key);
      if (key === 'ArrowLeft' || key === 'Left') {
        pressed.left = true;
        return;
      }
      if (key === 'ArrowRight' || key === 'Right') {
        pressed.right = true;
        return;
      }
      if (key === 'ArrowUp' || key === 'Up') {
        pressed.up = true;
        return;
      }
      if (key === 'ArrowDown' || key === 'Down') {
        pressed.down = true;
        return;
      }
      if (key === 'z' || key === 'Z') {
        pressed.Z = true;
        return;
      }
      if (key === 'x' || key === 'X') {
        pressed.X = true;
        return;
      }
      if (key === 'c' || key === 'C') {
        pressed.C = true;
        return;
      }
      if (key === 'v' || key === 'V') {
        pressed.V = true;
        return;
      }
      if (key === ' ' || key === '　') {
        pressed.SPACE = true;
        return;
      }
      if (key === 'Enter') {
        pressed.Enter = true;
        return;
      }
    });

    /** キー押下状態変更(押下解除) */
    window.addEventListener('keyup', (ev) => {
      const key = ev.key;
      if (key === 'ArrowLeft' || key === 'Left') {
        console.debug('pressed.left = false;');
        pressed.left = false;
        return;
      }
      if (key === 'ArrowRight' || key === 'Right') {
        console.debug('pressed.right = false;');
        pressed.right = false;
        return;
      }
      if (key === 'ArrowUp' || key === 'Up') {
        console.debug('pressed.up = false;');
        pressed.up = false;
        return;
      }
      if (key === 'ArrowDown' || key === 'Down') {
        console.debug('pressed.down = false;');
        pressed.down = false;
        return;
      }
      if (key === 'z' || key === 'Z') {
        console.debug('pressed.Z = false;');
        pressed.Z = false;
        return;
      }
      if (key === 'x' || key === 'X') {
        console.debug('pressed.X = false;');
        pressed.X = false;
        return;
      }
      if (key === 'c' || key === 'C') {
        console.debug('pressed.C = false;');
        pressed.C = false;
        return;
      }
      if (key === 'v' || key === 'V') {
        console.debug('pressed.V = false;');
        pressed.V = false;
        return;
      }
      if (key === ' ' || key === '　') {
        console.debug('pressed.SPACE = false;');
        pressed.SPACE = false;
        return;
      }
      if (key === 'Enter') {
        console.debug('pressed.Enter = false;');
        pressed.Enter = false;
        return;
      }
    });

    /**
     * ゲーム内オブジェクト
     *
     * 位置、速度、見かけサイズ、衝突サイズ、重さ　を管理する
     */
    class ObjInGame {
      /** @param {ObjInGame} o */
      constructor(o) {
        if (!o || !o.pos || !o.spd || !o.visualSize || !o.collisionSize) {
          /** 位置 x,y */
          this.pos = {
            x: 0,
            y: 0,
          };
          /** 速度 x,y */
          this.spd = {
            x: 0,
            y: 0,
          };
          /** 見かけサイズ w,h */
          this.visualSize = {
            w: 10,
            h: 10,
          };
          /** 衝突サイズ w,h */
          this.collisionSize = {
            w: 10,
            h: 10,
          };
          /** @type {integer} 重さ */
          this.weight = 0;
          return;
        }

        /** 位置(サイズの中心) x,y */
        this.pos = {
          x: o.pos.x,
          y: o.pos.y,
        };
        /** 速度(次のフレームに移動する距離) x,y */
        this.spd = {
          x: o.spd.x,
          y: o.spd.y,
        };
        /** 見かけサイズ w,h */
        this.visualSize = {
          w: o.visualSize.w,
          h: o.visualSize.h,
        };
        /** 衝突サイズ w,h */
        this.collisionSize = {
          w: o.collisionSize.w,
          h: o.collisionSize.h,
        };
        /** @type {integer} 重さ */
        this.weight = o.weight;
      }

      /**
       * オブジェクト描画
       * @param {CanvasRenderingContext2D} ctx
       */
      draw(ctx) {
        const obj = this;
        ctx.beginPath();
        ctx.fillStyle = obj.background;
        ctx.rect(obj.left, obj.top, obj.right - obj.left, obj.bottom - obj.top);
        ctx.fill();
        if (obj.border) {
          ctx.strokeStyle = obj.border.color || 'rgba(0,0,0,1.0)';
          ctx.lineWidth = obj.border.width || 1;
          ctx.stroke();
        }
      }
    }

    /** 操作バー　自分 */
    class MyBar extends ObjInGame {
      /** @param {MyBar} bar */
      constructor(bar) {
        super(bar);
        bar ? bar : (bar = new ObjInGame());
        /** @type {boolean} ボールを保持しているか */
        this.hasBall = bar.hasBall || false;
      }
    }

    /** ボール */
    class Ball extends ObjInGame {}

    /** ゲーム本体(キャンバスやFPS、ゲームループ等を管理) */
    class Game {
      /**
       * ゲーム初期化
       * @param {HTMLCanvasElement} canvas
       */
      constructor(canvas) {
        log('ゲームクラス load 開始');
        /** メインキャンバス */
        this.canvas = canvas;
        /** メインキャンバス2Dコンテキスト */
        this.ctx = canvas.getContext('2d');
        /** 前回ループ時の経過時間(FPS計算用) */
        this.preNow = performance.now();
        /** 1秒間に何回描画できているか(Frame Per Sec.) */
        this.FPS = 0;
        /** FPSの有効桁数(2 なら x.xx に丸める) */
        this.FpsEffectiveDigit = 2;
        /** ゲームタイトル */
        this.title = 'ブロック崩し(Breakout) プレーン';
        /** タイトルバー(キャンバス上部でタイトルとFPSを表示) */
        this.TitleBar = {
          left: 0,
          right: 640,
          top: 0,
          bottom: 20,
          text: `${this.title} ${this.FPS}`,
          background: 'rgba(66,66,255,1.0)',
          border: {
            width: 1,
            color: 'rgba(0,0,0,1.0)',
          },
          font: 'bold 14px "ＭＳ ゴシック",sans-serif',
          color: 'rgba(255,255,255,1.0)',
          draw: () => {
            const bar = this.TitleBar;
            const ctx = this.ctx;
            bar.text = `${this.title} / FPS:${this.FPS}`;

            ctx.beginPath();
            ctx.fillStyle = bar.background;
            ctx.rect(bar.left, bar.top, bar.right - bar.left, bar.bottom - bar.top);
            ctx.fill();
            if (bar.border) {
              ctx.strokeStyle = bar.border.color || 'rgba(0,0,0,1.0)';
              ctx.lineWidth = bar.border.width || 1;
              ctx.stroke();
            }

            ctx.beginPath();
            ctx.font = bar.font;
            ctx.fillStyle = bar.color;
            ctx.textBaseline = 'middle';
            ctx.lineWidth = 3;
            ctx.fillText(bar.text, bar.left + 5, bar.top + bar.bottom / 2);
          },
        };
        /** ステータスバー(キャンバス下部でゲーム状態を表示) */
        this.StatusBar = {
          left: 0,
          right: 640,
          top: 520 - 20,
          bottom: 520,
          text: 'ゲーム準備中……',
          background: 'rgba(200,200,200,1.0)',
          border: {
            width: 1,
            color: 'rgba(0,0,0,1.0)',
          },
          font: 'bold 14px "ＭＳ ゴシック",sans-serif',
          color: 'rgba(0,0,0,1.0)',
          draw: () => {
            const bar = this.StatusBar;
            const ctx = this.ctx;

            ctx.beginPath();
            ctx.rect(bar.left, bar.top, bar.right - bar.left, bar.bottom - bar.top);
            ctx.fillStyle = bar.background;
            ctx.fill();
            if (bar.border) {
              ctx.strokeStyle = bar.border.color || 'rgba(0,0,0,1.0)';
              ctx.lineWidth = bar.border.width || 1;
              ctx.stroke();
            }

            ctx.beginPath();
            ctx.font = bar.font;
            ctx.fillStyle = bar.color;
            ctx.textBaseline = 'middle';
            ctx.lineWidth = 3;
            ctx.fillText(bar.text, bar.left + 5, bar.top + (bar.bottom - bar.top) / 2);
          },
        };
        /** ゲームのコア画面範囲(キャンバス左上を0,0、右下を640,520として、左/右/上/下の範囲を指定) */
        this.CoreWindow = {
          left: 0,
          right: 640,
          top: 20,
          bottom: 520 - 20,
        };

        this.myBar = new MyBar();

        setTimeout(() => {
          log('ゲームクラス load 完了');
          this.loop();
        }, 0);
      }

      /** 内部パラメータ(ステータス/位置等)の1Fごと更新 */
      update() {}
      /** 現在の情報に基づく再描画 */
      draw() {
        this.TitleBar.draw();
        this.StatusBar.draw();
        this.myBar.draw(this.ctx);
      }
      /** ゲームループ(1F) */
      loop() {
        requestAnimationFrame((t) => {
          const efDig = Math.pow(10, this.FpsEffectiveDigit);
          this.FPS = Math.round((1000 * efDig) / (t - this.preNow)) / efDig;
          this.preNow = t;
          // console.log(this.FPS);

          this.update();
          this.draw();
          this.loop();
        });
      }
    }

    const game = new Game(canvas);
  })();
  console.log(`${FILE_NAME} load end.`);
}
