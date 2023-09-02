import { Block } from "./block.js";
import { Bar } from "./bar.js";
import { Ball } from "./ball.js";

class App{
    constructor(){
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.gameLife = document.getElementById("game-life");

        const blockWidth = 50;
        const blockHeight = 20;

        this.life = 5;

        this.blocks = [];

        for(let i = 0; i <= this.canvas.width - blockWidth; i += blockWidth){
            for(let j = 50; j <= 200; j += blockHeight){
                this.blocks.push(new Block(i, j));
            }
        }

        this.bar = new Bar(100, this.canvas.width, this.canvas.height);

        this.ball = new Ball(10, this.canvas.width, this.canvas.height, this.bar, this.blocks);

        const moveSpeed = 10;

        window.addEventListener('keydown', (e) => {
            // 오른쪽
            if(e.key === "ArrowRight"){ this.bar.vx = moveSpeed; }
            // 왼쪽
            if(e.key === "ArrowLeft"){ this.bar.vx = -moveSpeed; }
            // 스페이스바
            if(e.key == " "){ 
                if (this.ball.isGameStart != true) {
                    this.life--;
                    this.gameLife.textContent = `남은 기회 : ${this.life}`
                }

                this.ball.isGameStart = true;
                
                if (this.life == -1) {
                    modal();
                    this.ball.isGameStart = false;
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            if(e.key === "ArrowRight" || e.key == "ArrowLeft"){ this.bar.vx = 0; }
        });

        window.requestAnimationFrame(this.animate.bind(this));
    }

    draw(){
        this.ctx.fillStyle = "#102330";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.bar.draw(this.ctx);

        this.ball.draw(this.ctx);
    }

    animate(){
        this.draw();

        window.requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}

function modal() {
    const modalHTML = `
        <div class="modal">
            <div class="modal-content">
                <h2>게임 종료</h2>
                <p>기회가 모두 소진되었습니다.</p>
                <button id="restart-button">재시작</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
        location.reload(true);
        closeModal();
    });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}