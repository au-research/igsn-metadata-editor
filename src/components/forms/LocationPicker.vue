<template>
  <div class="flex flex-col">
    <div id="map" class="w-full" style="height:310px"></div>
    <!--    <input-->
    <!--        class="mt-3"-->
    <!--        :value="value"-->
    <!--        v-on:input="updateValue($event.target.value)"-->
    <!--        @keyup="draw()"-->
    <!--    />-->
  </div>
</template>

<script>
import {EventBus} from "@/services/event-bus"
import L from "leaflet"
import Wkt from "wicket"
import "leaflet-draw"
import "wicket/wicket-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw-src.css"

// Fix the issue where the marker-icon are not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: "LocationPicker",
  props: {
    value: String
  },
  data() {
    return {
      map: null,
      drawnItems: null,
    }
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value)
    },
    initMap() {
      this.map = L.map('map', {
        center: [-25, 130],
        zoom: 3
      });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map)

      this.drawnItems = new L.FeatureGroup()
      this.map.addLayer(this.drawnItems)

      let drawControl = new L.Control.Draw({
        draw: {
          polygon: true,
          marker: true,
          circle: false,
          circlemarker: false
        }
      })
      this.map.addControl(drawControl)

      // Fix the issue where the map tile is out of whack when tabbing over to a map
      // on tab event, invalidateSize and redraw
      let that = this
      EventBus.$on('tab', () => {
        setTimeout(function () {
          window.dispatchEvent(new Event('resize'))
          that.map.invalidateSize()
          that.draw()
        }, 250);
      })
    },
    getWKTFromString(wktValue) {
      let wkt = new Wkt.Wkt()
      try {
        wkt.read(wktValue)
      } catch (e1) {
        try {
          wkt.read(wktValue.replace('\n', '').replace('\r', '').replace('\t', ''))
        } catch (e2) {
          if (e2.name === 'WKTError') {
            console.error('Error parsing WKT', wktValue)
            return null
          }
        }
      }
      return wkt
    },
    draw() {
      if (!this.value || this.value.trim() === '') {
        return;
      }
      let wkt = this.getWKTFromString(this.value)
      if (wkt === null) {
        return;
      }
      let obj = wkt.toObject()
      this.drawnItems.clearLayers()
      obj.addTo(this.drawnItems)
      if (obj.getBounds !== undefined && typeof obj.getBounds === 'function') {
        this.map.fitBounds(obj.getBounds())
      } else if (obj.getLatLng !== undefined && typeof obj.getLatLng === 'function') {
        this.map.panTo(obj.getLatLng())
      }
    },
  },
  watch: {
    value() {
      this.draw();
    }
  },
  mounted() {
    this.initMap()

    if (this.value && this.value.trim() !== '') {
      this.draw()
    }

    let that = this
    this.map.on(L.Draw.Event.CREATED, function (e) {
      let type = e.layerType,
          layer = e.layer,
          wkt = new Wkt.Wkt()

      that.drawnItems.clearLayers()
      that.drawnItems.addLayer(layer)

      // handle Marker type differently
      if (layer instanceof L.Marker) {
        let wktString = "POINT(" + layer.getLatLng().lng + " " + layer.getLatLng().lat + ")"
        that.updateValue(wktString)
        return
      }

      // POLYGON, LINESTRING
      wkt.fromObject(layer)
      that.updateValue(wkt.write())
    })
  }
}
</script>

<style scoped>

</style>