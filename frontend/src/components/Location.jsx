import GoogleMap from "google-map-react";
import './Location.scss'

function Marker() {
    /* &apos; pentru ' ca nu exista ca si caracter */
    return (
        <div className='marker'>
            Hyde&apos;s Den
        </div>
    )
}
/* am  folosit nmp install google-map-react pentru a folosit googlemaps si sa configurez locatia*/
/* https://console.cloud.google.com/google/maps-apis/api-list?project=hydes-den */
export default function Location() {
    return (
        <section className='location' id="contact">
            <h1>
                Contact
            </h1>
            <div>
                <address>
                    <p>Strada Barlogului , Nr.45, BRASOV, Romania, 050881</p>
                    <p>PROGRAM: 11:00 – 04:00</p>
                    <p>Business inquiries <a href="mailto:office@nexusclub.ro">office@Hydesclub.ro</a></p>
                    <p>Rezervari <a href="tel:+40749046133">0749 046 133</a></p>
                    <a href="/contact">Click aici ca sa ne lasi o parere </a>
                </address>
                <div style={{ height: "500px", width: "700px" }}>
                    <GoogleMap
                        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                        defaultCenter={{
                            lat: 45.667556,
                            lng: 25.583461
                        }}
                        defaultZoom={11}
                    >
                        <Marker

                            lat={45.708667}
                            lng={25.607192}
                        />
                    </GoogleMap>
                </div>
            </div>
        </section >
    )
}