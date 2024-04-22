import { Component } from '@angular/core';
import { Song } from 'src/app/interfaces/song.interface';
import { SearchSong } from 'src/app/interfaces/search-song.interface';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  constructor(private songService: SongService) {}

  song!: Song;

  songName: string = '';
  songArtist: string = '';
  search: string = '';
  id!: number;

  addSong(): void {
    this.songService
      .addSong(this.songName, this.songArtist, this.id)
      .subscribe();

    this.songName = '';
    this.songArtist = '';
  }

  onSongNameAndArtistChange() {
    let data: SearchSong = {
      songName: this.songName,
      songArtist: this.songArtist,
      search: this.search,
    };

    this.songService.onSearchSong.emit(data);
  }

  updateSongInfo(): void {
    const updatedSong: Song = {
      ...this.song,
      name: this.songName,
      artist: this.songArtist,
    };

    this.songService.updateSong(updatedSong).subscribe(() => {
      this.songService.onApplyClick.emit(updatedSong);
      this.songName = '';
      this.songArtist = '';
    });
  }

  ngOnInit(): void {
    this.songService.onEditClick.subscribe((song: Song) => {
      this.song = song;
      this.songName = song.name;
      this.songArtist = song.artist;
    });
  }
}
