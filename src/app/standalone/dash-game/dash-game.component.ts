import { Component, inject } from '@angular/core';
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
export class DashGameComponent {

  private dialogRef: MatDialogRef<{dialogTitle: string}> = inject(MatDialogRef<DashGameComponent>)
  private data: {dialogTitle: string} = inject(MAT_DIALOG_DATA)

  private storageService = inject(StorageDataService)

  public window: any = inject(WINDOW)
  public isMobile: boolean = this.window.navigator.userAgentData.mobile

  public dialogTitle = this.data.dialogTitle
  tiles: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]

  listenForClicks = () => {
    document.addEventListener('keydown', (event) => {
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
    document.addEventListener('swiped-left', (event) => {
      this.moveLeft()
    })
    document.addEventListener('swiped-right', (event) => {
      this.moveRight()
    })
    document.addEventListener('swiped-up', (event) => {
      this.moveUp()
    })
    document.addEventListener('swiped-down', (event) => {
      this.moveDown()
    })
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
    })
    document.removeEventListener('swiped-left', (event) => {
      this.moveLeft()
    })
    document.removeEventListener('swiped-right', (event) => {
      this.moveRight()
    })
    document.removeEventListener('swiped-up', (event) => {
      this.moveUp()
    })
    document.removeEventListener('swiped-down', (event) => {
      this.moveDown()
    })
  }

  newGame() {
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
    let zeros = 0
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i] == 0) {
        zeros++
      }
    }
    if (zeros === 0) {
      window.alert('Game Over')
      this.stopListeningForClicks()
      setTimeout(() => this.newGame(), 3000)
    }
  }

  setNewTile() {
    let randomIndex = Math.floor(Math.random() * 16)
    while(this.tiles[randomIndex] != 0) {
      randomIndex = Math.floor(Math.random() * 16)
    }
    this.tiles[randomIndex] = 2
    setTimeout(() => this.checkIfGameOver(), 100)
  }

  moveRight() {
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
    this.setNewTile()
  }

  moveLeft() {
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
    this.setNewTile()
  }

  moveUp() {
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
    this.setNewTile()
  }

  moveDown() {
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
    this.setNewTile()
  }

  closeDialog() {
    this.dialogRef.close(false)
  }

  tileColors(tile: any): string {
    let color = 'hsl(219, 83%'
    switch(tile){
      case 2: color += ', 85%)'; break
      case 4: color += ', 80%)'; break
      case 8: color += ', 75%)'; break
      case 16: color += ', 70%)'; break
      case 32: color += ', 65%)'; break
      case 64: color += ', 60%)'; break
      case 128: color += ', 55%)'; break
      case 256: color += ', 50%)'; break
      case 512: color += ', 45%)'; break
      case 1024: color += ', 40%)'; break
      case 2048: color += ', 35%)'; break
      default: color += 'rgba(221, 221, 221, 0.7)'; break
    }
    return color
  }
}
