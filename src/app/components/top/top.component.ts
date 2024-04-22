import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchSong } from 'src/app/interfaces/search-song.interface';
import { Song } from 'src/app/interfaces/song.interface';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  constructor(private songService: SongService) {}

  @Output() onSearchSong: EventEmitter<SearchSong> = new EventEmitter();
  @Output() onEditSong: EventEmitter<Song> = new EventEmitter();
  @Output() onApplyClick: EventEmitter<Song> = new EventEmitter();

  @Input() songs: Song[] = []; //filtered songs array
  originalSongsArray: Song[] = [];

  getTop() {
    this.songs = this.songs.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (a.votes === b.votes) {
        return dateB.getTime() - dateA.getTime();
      }

      return b.votes - a.votes;
    });

    this.songs.forEach((song, index) => (song.position = index + 1));
  }

  filterResults(search: string) {
    if (!search) {
      this.songs = this.originalSongsArray;
      return;
    }

    this.songs = this.originalSongsArray.filter((song) => {
      return (
        song.name.toLowerCase().includes(search.toLowerCase().trim()) ||
        song.artist.toLowerCase().includes(search.toLowerCase().trim())
      );
    });
  }

  ngOnInit(): void {
    this.songService.getSongs().subscribe((songs) => {
      songs.forEach((song, index) => (song.position = index + 1));

      this.songs = songs;
      this.originalSongsArray = songs;

      this.getTop();
    });

    this.songService.onSongAdded.subscribe((song: Song) => {
      this.originalSongsArray.push(song);
      this.songs = this.originalSongsArray;

      this.getTop();
    });

    this.songService.onSearchSong.subscribe((song: SearchSong) => {
      this.filterResults(song.search);
    });

    this.songService.onApplyClick.subscribe((updatedSong: Song) => {
      const index = this.songs.findIndex((song) => song.id === updatedSong.id);
      if (index !== -1) {
        this.songs[index] = updatedSong;
      }

      this.songService.getSongs().subscribe((songs) => {
        songs.forEach((song, index) => (song.position = index + 1));
        this.songs = songs;
        this.originalSongsArray = songs;

        this.getTop();
      });
    });
  }

  songVoted() {
    this.getTop();
  }

  songDeleted(song: Song) {
    this.songService.deleteSong(song).subscribe(() => {
      this.originalSongsArray = this.originalSongsArray.filter(
        (t) => t.id !== song.id
      );
      this.songs = this.songs.filter((t) => t.id !== song.id);

      this.songService.getSongs().subscribe((songs) => {
        songs.forEach((song, index) => (song.position = index + 1));
        this.songs = songs;
        this.originalSongsArray = songs;

        this.getTop();
      });
    });
  }
}
