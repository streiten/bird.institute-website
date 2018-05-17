(function(window){

    HLSDASHPlayer.prototype.constructor = HLSDASHPlayer;

    function HLSDASHPlayer(hlsurl,mpdurl,playerId,debug){

        this.mpdsrc = mpdurl;
        this.hlssrc = hlsurl;
        this.playerId = playerId;

        this.debug = debug || false;

        this.init();
        
    }

    HLSDASHPlayer.prototype.init = function(){

        video = document.querySelector(this.playerId);

        if (Hls.isSupported()) {
          console.log('HLS/MSE:',this.hlssrc);
          
          var hlsPlayer = new Hls( 
            { 
              debug: this.debug ,
              capLevelToPlayerSize: true
            }
          );

          hlsPlayer.loadSource(this.hlssrc);
          hlsPlayer.attachMedia(video);
          hlsPlayer.on(Hls.Events.MANIFEST_PARSED,function() {
            video.play();
          });

        
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {

          console.log('HLS/NATIVE...', this.hlssrc);
          video.src = this.hlssrc;
          video.addEventListener('canplay',function() {
            video.play();
          });
        } 
        
        else {
          console.log('DASH:',this.mpdsrc);
          var dashPlayer = dashjs.MediaPlayer().create();
          dashPlayer.initialize(video, this.mpdsrc, true);
        }

    }

    window.HLSDASHPlayer = HLSDASHPlayer;

}(window));