import videojs from 'video.js'

// Default options for the plugin.
const defaults = {}

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
const onPlayerReady = (player, options) => {
  player.addClass('vjs-audio-player')
}

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function audioPlayer
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */

const Component = videojs.getComponent('Component')
const AudioPlayer = videojs.extend(Component, {})
const CurrentTrack = videojs.extend(Component, {})
const PlayerDash = videojs.extend(Component, {})
const TimeDisplay = videojs.extend(Component, {})

videojs.registerComponent('AudioPlayer', AudioPlayer)
videojs.registerComponent('PlayerDash', PlayerDash)
videojs.registerComponent('CurrentTrack', CurrentTrack)
videojs.registerComponent('TimeDisplay', TimeDisplay)

const audioPlayer = function (options) {
  this.ready(() => {
    this.removeChild('PosterImage')
    this.removeChild('TextTrackDisplay')
    this.removeChild('BigPlayButton')
    this.removeChild('ControlBar')
    onPlayerReady(this, videojs.mergeOptions(defaults, options))
  })

  const _audioPlayer = this.addChild('AudioPlayer')
  _audioPlayer.addClass('vjs-ap-container')
  const _playerDash = _audioPlayer.addChild('PlayerDash')
  _playerDash.addClass('vjs-ap-dash')
  const _currentTrack = _playerDash.addChild('CurrentTrack')
  _currentTrack.addClass('vjs-ap-current-track')
  const _controlBar = _playerDash.addChild('ControlBar')
  // debugger;
  _controlBar.addClass('vjs-ap-control-bar')
  _controlBar.removeChild('FullscreenToggle')
  // 隐藏掉 
  _controlBar.removeChild('RemainingTimeDisplay')
  // 隐藏掉 画中画
  _controlBar.removeChild('pictureInPictureToggle')
  // 隐藏到音量键
  _controlBar.removeChild('volumePanel')
  // 隐藏 播放按钮
  _controlBar.removeChild('playToggle')

  // _controlBar.addChild('DurationDisplay')
  // debugger;
  // time display
  const _timeDisplay = _controlBar.addChild('TimeDisplay')
  _timeDisplay.addClass('vjs-ap-time-display')
  _timeDisplay.addChild('CurrentTimeDisplay')
  // 当前时间和持续时间之间的分隔 
  // _timeDisplay.addChild('TimeDivider')
  // _timeDisplay.addChild('DurationDisplay')
  const _timeDisplay0 = _controlBar.addChild('TimeDisplay')
  _timeDisplay0.addClass('vjs-ap-time-display2')
  _timeDisplay0.addChild('DurationDisplay')

  // cover image
  // const _cover = document.createElement('img')
  // _cover.classList.add('vjs-ap-cover--desktop')
  // _cover.src = options.cover
  // coverMobile image
  // const _coverMobile = document.createElement('img')
  // _coverMobile.classList.add('vjs-ap-cover--mobile')
  // _coverMobile.src = options.coverMobile ? options.coverMobile : options.cover
  // track text
  const _text = document.createElement('div')
  _text.classList.add('vjs-ap-track-text')
  // artist
  const _artist = document.createElement('h3')
  _artist.classList.add('vjs-ap-artist')
  _artist.textContent = options.artist
  // track (truncated)
  const _trackTruncated = document.createElement('h2')
  _trackTruncated.classList.add('vjs-ap-track-truncated')
  _trackTruncated.id = 'test';
  _trackTruncated.textContent = options.track.length > 55 ? options.track.substring(0, 55) + '...' : options.track
  // track
  const _track = document.createElement('h2')
  _track.classList.add('vjs-ap-track')
  _track.textContent = options.track
  // share/subscribe
  // const _shareSubscribe = document.createElement('div')
  // const _share = document.createElement('div')
  // const _subscribe = document.createElement('div')
  // _shareSubscribe.classList.add('vjs-ap-share-subscribe')

  // this.el().append(_shareSubscribe)
  // _audioPlayer.el().prepend(_cover)
  // _currentTrack.el().prepend(_coverMobile)
  _currentTrack.el().append(_text)
  // _text.append(_artist)
  _text.append(_track)
  _text.append(_trackTruncated)
}

// Register the plugin with video.js.
registerPlugin('audioPlayer', audioPlayer)

// Include the version number.
audioPlayer.VERSION = '1.0'
export default audioPlayer