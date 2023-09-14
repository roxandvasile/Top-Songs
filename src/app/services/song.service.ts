import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { Song } from '../interfaces/song.interface';
import { SearchSong } from '../interfaces/search-song.interface';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/songs';

  onSongAdded: EventEmitter<Song> = new EventEmitter<Song>();
  onSearchSong: EventEmitter<SearchSong> = new EventEmitter();
  onEditClick: EventEmitter<Song> = new EventEmitter();
  onApplyClick: EventEmitter<Song> = new EventEmitter();

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.url);
  }

  addSong(name: string, artist: string, id: number): Observable<Song> {
    const newSong: Song = {
      id: id++,
      name: name,
      artist: artist,
      votes: 0,
      date: new Date().toLocaleString(),
    };

    return this.http.post<Song>(this.url, newSong).pipe(
      tap((song: Song) => {
        this.onSongAdded.emit(song);
      })
    );
  }

  updateSong(song: Song): Observable<Song> {
    const url = `${this.url}/${song.id}`;
    return this.http.put<Song>(url, song);
  }

  deleteSong(song: Song): Observable<Song> {
    const url = `${this.url}/${song.id}`;
    return this.http.delete<Song>(url);
  }
}
