(function () {
	 /**
	 * @function SongPlayer
	 * @desc create a Songplayer object and make its propperties and methods public to the application.
	 * @parm {object}
	 * @return {object}
	 */
     function SongPlayer($rootScope, Fixtures) {
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
			
			currentBuzzObject.bind('timeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});
			
			currentBuzzObject.bind('volumeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.volume = currentBuzzObject.setVolume();
				});
			});

			SongPlayer.currentSong = song;
			
			/**
			* @desc Current playback time (in seconds) of currently playing
			* @type {Number}
			*/
			SongPlayer.currentTime = null;
			
			/**
			* @desc volume of the song
			* @type {Number}
			*/
			SongPlayer.volume = 50;
			
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
		 
		 /**
		 * @func setCurrentTime
		 * @desc Set current time (in seconds) of currently playing song
		 * @param {Number} time
		 */
		 SongPlayer.setCurrentTime = function(time){
			 if (currentBuzzObject) {
				 currentBuzzObject.setTime(time);
			 }
		 };
		 
		 /**
		 * @func setVolume
		 * @desc set volume of currenly playing song
		 * @parat {number} volume
		 */
		 SongPlayer.setVolume = function(volume){
			 if (currentBuzzObject) {
				 currentBuzzObject.setVolume(volume);
			 }
		 };
		 
		 return SongPlayer;
     }
 
     angular
     .module('blocJams')
     .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
