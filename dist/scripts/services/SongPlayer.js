(function () {
	 /**
	 * @function SongPlayer
	 * @desc create a Songplayer object and make its propperties and methods public to the application.
	 * @parm {object}
	 * @return {object}
	 */
     function SongPlayer(Fixtures) {
        var SongPlayer = {};
		
		/**
		* @desc store album information
		* @type {object}
		*/
		var currentAlbum = Fixtures.getAlbum();
		 
		 /**
		 * @desc Buzz object audio file
		 * @type {Object}
		 */ 
		var currentBuzzObject = null;
		
		 /**
		 * @function private setSong
		 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
		 * @param {Object} song
		 * @returns {Number}
		 */
		var setSong = function(song) {
		if (currentBuzzObject) {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
			formats: ['mp3'],
			preload: true
			});

			SongPlayer.currentSong = song;
	 	};
		
		/**
		* @function private playSong
		* @desc play currently playing song and set the value to true
		* @param {object} song
		*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
			};
		
		/**
		* @desc track index of the song
		* @type {object}
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};
		
		/**
		* @desc stop currently playing song
		* @type {object}
		*/
		var stopSong = function(song){
			currentBuzzObject.stop();
			song.playing = null;
		};
		 
		/**
		* @desc Active song object from list of songs
		* @type {object}
		*/
		SongPlayer.currentSong = null;
		 
		/** 
		* @function SongPlayer.play
		* @desc play a song using setSong and playSong methods
		* @param {object} song
		*/
		SongPlayer.play = function(song){
			song = song || SongPlayer.currentSong;
			if(song === null) {
				setSong(currentAlbum.songs[0]);
				playSong(currentAlbum.songs[0]);
			}
			else if(SongPlayer.currentSong !== song) {
				setSong(song);
			 	playSong(song);
			 
			 	}else if (SongPlayer.currentSong === song) {
				 if (currentBuzzObject.isPaused()) {
					 playSong(song);
				 	}	
			 	 }
		 };
		 
		 /**
		 * @function songPlayer.pause
		 * @desc pause currenltly playing song and set the value to false
		 * @param {object} song
		 */
		 SongPlayer.pause = function(song) {
			 song = song || SongPlayer.currentSong;
			 currentBuzzObject.pause();
			 song.playing = false;
		 	 };
		 
		 /**
		 * @function SongPlayer.previous
		 * @desc set index for prior of currently playing song
		 * @type {object}
		 */
		 SongPlayer.previous = function() {
			 var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			 currentSongIndex--;
			 
			 if (currentSongIndex < 0) {
				 stopSong(SongPlayer.currentSong);
			 } else {
				 var song = currentAlbum.songs[currentSongIndex];
				 setSong(song);
				 playSong(song);
			 }
		 };
		 
		 SongPlayer.next = function() {
			 var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			 currentSongIndex++;
			 
			 if (currentSongIndex >= currentAlbum.songs.length) {
				 stopSong(SongPlayer.currentSong);
			 } else {
				 var song = currentAlbum.songs[currentSongIndex];
				 setSong(song);
				 playSong(song);
			 }
		 };
		 
		 return SongPlayer;
     }
 
     angular
     .module('blocJams')
     .factory('SongPlayer', SongPlayer);
 })();
