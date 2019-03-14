import React from 'react';
import { StartLayout } from './StartLayout';
import {Link} from 'react-router-dom';

export const PrivacyPolicy = () => {
		return (
			<StartLayout>
				<div className="privacy-form">
					<div className="privacy-header">
					<Link to='/'>
						<img alt='1' className='left-arrow'
						src="./img/ic_arrow_left.png"/>
					</Link>
						<div className="privacy-title">Privacy Policy</div>
					</div>
					<div className="privacy-text">
						My Company (change this) («us», «we», or «our») operates http://www.mysite.com (change this) (the «Site»).
						This page informs you of our policies regarding the collection, use and disclosure of Personal
						Information we receive from users of the Site.
						<p>We use your Personal Information only for providing and improving the Site. By using the Site,
							you agree to the collection and use of information
							in accordance with this policy.</p>
						<p className="privacy-subtitle">Information Collection And Use</p>
						While using our Site, we may ask you to provide us with certain personally
						identifiable information that can be used to contact or identify you. Personally
						identifiable information may include, but is not limited to your name («Personal Information»).
						<p className="privacy-subtitle">Log Data</p>
						Like many site operators, we collect information that your browser sends whenever you visit
						our Site («Log Data»). This Log Data may include information such as your computer’s Internet
						Protocol («IP») address, browser type, browser version, the pages of our Site that you visit,
						the time and date of your visit, the time spent on those pages and other statistics. In addition,
							we may use third party services such as Google Analytics that collect, monitor and analyze this …
						<p className="privacy-subtitle">Communications</p>
						We may use your Personal Information to contact you with newsletters, marketing or promotional
						materials and other information that …<p></p>
					</div>
				</div>
			</StartLayout>
		);
}