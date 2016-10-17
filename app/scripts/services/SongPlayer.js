(function () {
	 /**
	 * @function SongPlayer
	 * @desc create a Songplayer object and make its propperties and methods public to the application.
	 * @parm {object}
	 * @return {object}
	 */
	
     function SongPlayer() {
        var SongPlayer = {};
        
		/**
		* @desc current song available
		* @type {object}
		*/
		var currentSong = null;
		
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
			currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
			formats: ['mp3'],
			preload: true
			});

			currentSong = song;
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
		* @function SongPlayer.play
		* @desc play a song using setSong and playSong methods
		* @param {object} song
		*/
		SongPlayer.play = function(song){
			 if(currentSong !== song) {
				setSong(song);
			 	playSong(song);
			 
			 	}else if (currentSong === song) {
				 if (currentBuzzObject.isPaused()) {
					 currentBuzzObject.play();
				 	}	
			 	 }
		 };
		 
		 /**
		 * @function songPlayer.pause
		 * @desc pause currenltly playing song and set the value to false
		 * @param {object} song
		 */
		 SongPlayer.pause = function(song) {
			 currentBuzzObject.pause();
			 song.playing = false;
		 	 };
		 
		 return SongPlayer;
     }
 
     angular
     .module('blocJams')
     .factory('SongPlayer', SongPlayer);
 })();
