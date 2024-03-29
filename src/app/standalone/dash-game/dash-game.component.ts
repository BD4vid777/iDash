import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { WINDOW } from "../../shared/window.token";
import { StorageDataService } from "../../shared/storage-data.service";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'id-dash-game',
  standalone: true,
  imports: [CommonModule, MatDialogModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './dash-game.component.html',
  styleUrls: ['./dash-game.component.scss']
})
export class DashGameComponent implements OnInit {

  private dialogRef: MatDialogRef<{dialogTitle: string}> = inject(MatDialogRef<DashGameComponent>)
  private data: {dialogTitle: string} = inject(MAT_DIALOG_DATA)

  private storageService = inject(StorageDataService)

  public window: any = inject(WINDOW)
  public isMobile: boolean = this.window.navigator.userAgentData ? this.window.navigator.userAgentData.mobile : this.window.navigator.userAgent.includes('Mobile')

  public dialogTitle = this.data.dialogTitle
  tiles: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]

  public score: number = 0
  public highScore: number = 0
  public isGameOver: boolean = true
  public gameMsg: string = 'Start Game'

  public hideHowToPlay: boolean = true

  private touchStartX: number = 0
  private touchEndX: number = 0
  private touchStartY: number = 0
  private touchEndY: number = 0

  ngOnInit() {
    this.highScore = this.storageService.getUserData().highScore
  }

  listenForClicks = () => {
    document.addEventListener('keydown', (event) => {
      if (this.isGameOver) return
      if (event.key === 'ArrowRight') {
        this.moveRight()
      } else if (event.key === 'ArrowLeft') {
        this.moveLeft()
      } else if (event.key === 'ArrowDown') {
        this.moveDown()
      } else if (event.key === 'ArrowUp') {
        this.moveUp()
      }
    })

    let gameTouch = document.getElementById('game-touch')
    if (!gameTouch) return

    gameTouch.addEventListener('touchstart', (event: any) => {
      this.touchStartX = event.touches[0].clientX
      this.touchStartY = event.touches[0].clientY
    })

    gameTouch.addEventListener('touchend', (event: any) => {
      this.touchEndX = event.changedTouches[0].clientX
      this.touchEndY = event.changedTouches[0].clientY
      this.handleSwipe()
    })
  }

  handleSwipe() {
    let xDiff = this.touchEndX - this.touchStartX
    let yDiff = this.touchEndY - this.touchStartY
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        this.moveRight()
      } else {
        this.moveLeft()
      }
    } else {
      if (yDiff > 0) {
        this.moveDown()
      } else {
        this.moveUp()
      }
    }
  }

  stopListeningForClicks = () => {
    document.removeEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        this.moveRight()
      } else if (event.key === 'ArrowLeft') {
        this.moveLeft()
      } else if (event.key === 'ArrowDown') {
        this.moveDown()
      } else if (event.key === 'ArrowUp') {
        this.moveUp()
      }
    }, false)

    let gameTouch = document.getElementById('game-touch')
    if (!gameTouch) return

    gameTouch.removeEventListener('touchstart', () => {
      this.touchStartX = 0
      this.touchStartY = 0
    })

    gameTouch.removeEventListener('touchend', () => {
      this.touchEndX = 0
      this.touchEndY = 0
    })
  }

  newGame() {
    this.gameMsg = ''
    this.isGameOver = false
    this.score = 0
    this.tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
    let randomIndex = Math.floor(Math.random() * 16)
    let randomIndex2 = Math.floor(Math.random() * 16)
    while(randomIndex2 == randomIndex) {
      randomIndex2 = Math.floor(Math.random() * 16)
    }
    this.tiles[randomIndex] = 2
    this.tiles[randomIndex2] = 2
    this.listenForClicks()
  }

  checkIfGameOver() {
    let availableMoves = 0
    let zeros = 0
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i] == 0) {
        zeros++
      }
      if (this.tiles[i] == this.tiles[i + 1] || this.tiles[i] == this.tiles[i + 4]) {
        availableMoves++
      }
    }
    if (zeros === 0 && availableMoves === 0) {
      this.prepareNewGame('Game Over')
    }
  }

  checkIfWin() {
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i] == 2048) {
        this.prepareNewGame('You Win!')
      }
    }
  }

  setHighScore() {
    let userData = this.storageService.getUserData()
    userData.highScore = this.highScore
    this.storageService.setUserData(userData)
  }

  prepareNewGame(msg: string) {
    if (this.score >= this.highScore) {
      this.highScore = this.score
      this.setHighScore()
    }
    this.isGameOver = true
    this.gameMsg = msg
    this.stopListeningForClicks()
    setTimeout(() => {
      this.score = 0
      this.tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
      this.gameMsg = 'Start Game'
    }, 3000)
  }

  setNewTile() {
    if (this.isGameOver) return
    let randomIndex = Math.floor(Math.random() * 16)
    while(this.tiles[randomIndex] != 0) {
      randomIndex = Math.floor(Math.random() * 16)
    }
    this.tiles[randomIndex] = 2
    setTimeout(() => this.checkIfGameOver(), 0)
  }

  moveRight() {
    this.setRight()
    this.combineRow('right')
    this.setRight()
    setTimeout(() => this.setNewTile(), 0)
  }

  moveLeft() {
    this.setLeft()
    this.combineRow('left')
    this.setLeft()
    setTimeout(() => this.setNewTile(), 0)
  }

  moveDown() {
    this.setDown()
    this.combineColumn('down')
    this.setDown()
    setTimeout(() => this.setNewTile(), 0)
  }

  moveUp() {
    this.setUp()
    this.combineColumn('up')
    this.setUp()
    setTimeout(() => this.setNewTile(), 0)
  }

  setRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = this.tiles[i]
        let totalTwo = this.tiles[i + 1]
        let totalThree = this.tiles[i + 2]
        let totalFour = this.tiles[i + 3]
        let row = [totalOne, totalTwo, totalThree, totalFour]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)

        this.tiles[i] = newRow[0]
        this.tiles[i + 1] = newRow[1]
        this.tiles[i + 2] = newRow[2]
        this.tiles[i + 3] = newRow[3]
      }
    }
  }

  setLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = this.tiles[i]
        let totalTwo = this.tiles[i + 1]
        let totalThree = this.tiles[i + 2]
        let totalFour = this.tiles[i + 3]
        let row = [totalOne, totalTwo, totalThree, totalFour]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        this.tiles[i] = newRow[0]
        this.tiles[i + 1] = newRow[1]
        this.tiles[i + 2] = newRow[2]
        this.tiles[i + 3] = newRow[3]
      }
    }
  }

  setUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = this.tiles[i]
      let totalTwo = this.tiles[i + 4]
      let totalThree = this.tiles[i + 8]
      let totalFour = this.tiles[i + 12]
      let column = [totalOne, totalTwo, totalThree, totalFour]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)

      this.tiles[i] = newColumn[0]
      this.tiles[i + 4] = newColumn[1]
      this.tiles[i + 8] = newColumn[2]
      this.tiles[i + 12] = newColumn[3]
    }
  }

  setDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = this.tiles[i]
      let totalTwo = this.tiles[i + 4]
      let totalThree = this.tiles[i + 8]
      let totalFour = this.tiles[i + 12]
      let column = [totalOne, totalTwo, totalThree, totalFour]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)

      this.tiles[i] = newColumn[0]
      this.tiles[i + 4] = newColumn[1]
      this.tiles[i + 8] = newColumn[2]
      this.tiles[i + 12] = newColumn[3]
    }
  }

  combineRow(direction: 'left' | 'right') {
    for (let i = 0; i < 16; i++) {
      if (direction === 'right') {
        if (this.tiles[i] === this.tiles[i + 1]) {
          let combinedTotal = this.tiles[i] + this.tiles[i + 1]
          this.tiles[i + 1] = combinedTotal
          this.tiles[i] = 0
          this.score += combinedTotal
          if (this.score > this.highScore) {
            this.highScore = this.score
          }
        }
      } else {
        if (this.tiles[i] === this.tiles[i - 1]) {
          let combinedTotal = this.tiles[i] + this.tiles[i - 1]
          this.tiles[i - 1] = combinedTotal
          this.tiles[i] = 0
          this.score += combinedTotal
          if (this.score > this.highScore) {
            this.highScore = this.score
          }
        }
      }

    }
    this.checkIfWin()
  }

  combineColumn(direction: 'up' | 'down') {
    for (let i = 0; i < 16; i++) {
      if (direction === 'down') {
        if (this.tiles[i] === this.tiles[i + 4]) {
          let combinedTotal = this.tiles[i] + this.tiles[i + 4]
          this.tiles[i + 4] = combinedTotal
          this.tiles[i] = 0
          this.score += combinedTotal
          if (this.score > this.highScore) {
            this.highScore = this.score
          }
        }
      } else {
        if (this.tiles[i] === this.tiles[i - 4]) {
          let combinedTotal = this.tiles[i] + this.tiles[i - 4]
          this.tiles[i - 4] = combinedTotal
          this.tiles[i] = 0
          this.score += combinedTotal
          if (this.score > this.highScore) {
            this.highScore = this.score
          }
        }
      }

    }
    this.checkIfWin()
  }

  closeDialog() {
    this.dialogRef.close(false)
  }

  tileColors(tile: any): string {
    let color = 'hsl(219, 83%'
    switch(tile){
      case 2: color += ', 95%)'; break
      case 4: color += ', 88%)'; break
      case 8: color += ', 80%)'; break
      case 16: color += ', 72%)'; break
      case 32: color += ', 64%)'; break
      case 64: color += ', 56%)'; break
      case 128: color += ', 48%)'; break
      case 256: color += ', 40%)'; break
      case 512: color += ', 32%)'; break
      case 1024: color += ', 24%)'; break
      case 2048: color += ', 18%)'; break
      default: color += 'rgba(221, 221, 221, 0.7)'; break
    }
    return color
  }

  toggleHowToPlay() {
    this.hideHowToPlay = !this.hideHowToPlay
  }
}
