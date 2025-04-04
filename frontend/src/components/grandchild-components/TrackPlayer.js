// TrackPlayer.js
// This component displays the audio player for the recommended track.

const TrackPlayer = ({ track }) => (
  <div>
    <h3>Now Playing:</h3>
    <p>
      {track.track_name} by {track.artist_name}
    </p>
    <audio controls>
      <source src={track.audio_url} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
);

export default TrackPlayer;
