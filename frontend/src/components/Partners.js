import './Partners.scss'

export default function Partners() {
	const partnersLogos = [
		"RTX.png",
		"legion.png",
		"logitech.png",
		"zowie_final.png",
		"dotro_telecom_logo1.png",
		"lenovo.png",
		"tp_link.png",
	];

	return (
		<section className='partners'>
			<h3>Sponsored by</h3>
			<div>
				{partnersLogos.map((partnerLogo) => (
					<img
						key={partnerLogo}
						src={`/partners/${partnerLogo}`}
						alt={partnerLogo}
						width={140}
						height={98}
					/>
				))}
			</div>
		</section>
	);
}
