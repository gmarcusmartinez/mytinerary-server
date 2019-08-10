import { connect } from 'react-redux'
import PinIcon from './PinIcon'
import React, { useState, useEffect } from 'react'
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl'
import { withStyles } from '@material-ui/core/styles'

const initialViewport = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13
}

const Map = ({ classes, activities: { activities, loading } }) => {
  const [viewport, setViewport] = useState(initialViewport)
  useEffect(() => {
    if (activities.length !== 0) {
      setViewport({
        latitude: activities[0].coords.lng,
        longitude: activities[0].coords.lat,
        zoom: 13
      })
    }
  }, [activities])
  return (
    <div className={classes.main}>
      <ReactMapGL
        width="100vw"
        height="675px"
        mapStyle="mapbox://styles/mapbox/streets-v10"
        onViewportChange={viewport => setViewport(viewport)}
        {...viewport}>
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={viewport => setViewport(viewport)}
          />
        </div>
        {activities &&
          activities.map(activity => (
            <div key={activity._id}>
              <Marker
                latitude={activity.coords.lng}
                longitude={activity.coords.lat}
                offsetLeft={-19}
                offsetTop={-37}>
                <PinIcon />
              </Marker>
            </div>
          ))}
      </ReactMapGL>
    </div>
  )
}

const styles = {
  main: {
    display: 'flex'
  },
  navigationControl: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '1em'
  }
}
const mapStateTotProps = state => ({
  activities: state.activities
})
export default connect(
  mapStateTotProps,
  {}
)(withStyles(styles)(Map))
