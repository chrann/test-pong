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
      left: false
      ,right: false
      ,up: false
      ,down: false
      ,Z: false
      ,X: false
      ,C: false
      ,V: false
      ,SPACE: false
      ,Enter: false
    };

    /** キー押下状態変更(押下) */
    window.addEventListener('keydown', (ev)=>{
      const key = ev.key;
      console.debug(key);
      if(key === 'ArrowLeft' || key === 'Left') {
        pressed.left = true;
      }
      // キーチェック続ける
    });
    /** キー押下状態変更(押下解除) */

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
    }

    /** 操作バー　自分 */
    class MyBar extends ObjInGame {
      /** @param {MyBar} bar */
      constructor(bar) {
        super(bar);
        /** @type {boolean} ボールを保持しているか */
        this.hasBall = bar.hasBall;
      }
    }

    /** ボール */
    class Ball extends ObjInGame {
      
    }
1;
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
      }
      /** ゲームループ(1F) */
      loop() {
        requestAnimationFrame((t) => {
          this.FPS = Math.round(100000 / (t - this.preNow)) / 100;
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
