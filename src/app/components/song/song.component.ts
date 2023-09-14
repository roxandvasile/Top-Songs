import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Song } from 'src/app/interfaces/song.interface';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent {
  constructor(private songService: SongService) {}

  @Input() song!: Song;

  @Output() onSongVoted: EventEmitter<Song> = new EventEmitter();
  @Output() onSongDeleted: EventEmitter<Song> = new EventEmitter();

  voteSong(): void {
    this.song.votes++;
    this.onSongVoted.emit(this.song);

    this.songService.updateSong(this.song).subscribe();
  }

  deleteSong(song: Song): void {
    this.onSongDeleted.emit(song);
  }

  editSong(song: Song): void {
    this.songService.onEditClick.emit(song);
  }
}
