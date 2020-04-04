import React, { Component } from 'react';
import { Main } from '../../layout';
import { Container, Row, Col } from 'react-bootstrap';
import { DocumentTitle } from '../../../helpers/DocumentTitle';

class PrivacyPolicy extends Component {
    render() {
        const { location } = this.props;
        let search = new URLSearchParams(location.search);
        return (<Main onlycontent={search.get("onlycontent")}>
            <DocumentTitle title={`Privacy Policy`}/>
            <div className="contant-pages">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h1 className="text-center heading"><span>Privacy Policy</span></h1>
                            Effective Date: September 17, 2019 <br />
                            Last Updated: September 17, 2019 <br /><br />
                                    <h2> About this Policy</h2>
                                    <p className="pb-2">JoBarter.com is committed to protecting and respecting your privacy.</p>
                                    <p className="pb-2">JoBarter Corporation ("JoBarter", "jobarter", "we", "us", "our") provides this Privacy Policy ("Policy") to let you know how we collect, use, and disclose your personal information through www.jobarter.com ("Site"), and our Mobile IOS and Android mobile applications (together with the Site, "Services") that are owned or controlled by JoBarter. This Policy applies regardless of the device used to access the Services and applies to all the different features that we offer at JoBarter such as job posting, bidding, hiring, service purchase service exchange, and cofounder matching. Before you submit any information through the Site or access our Services, please carefully review this Policy together with our Terms of Service and any other documents referred to therein to understand our views and practices regarding your information and how we will treat it. By using any part of the Services, you consent to the collection, use, and disclosure of your information as further outlined in this Policy. Please note that this Policy applies only to information collected through the Services that we offer at JoBarter and not to information you may provide to any third-party sites to which we may link, except as expressly provided herein.  Some online services offered by or affiliated with us may be governed by a separate privacy policy. In those instances, the product-specific privacy policy shall apply to that online service.</p>


                                <h2>Information Collection</h2>


                                    <h4> Information You Provide Directly to Us</h4>
                                    <p className="pb-2">Information we receive directly from you includes personal information you share with us in order to use our services. For example:</p>

                                    <p className="pb-2">We may collect information from you during your use of or access to the Services. Categories of information that we may collect from you include:</p>

                                    <ul>
                                        <li><b>Personal Information:</b> When you use our Service, we may require or otherwise collect information that identifies you as a specific individual. For example, we may require you to provide us with your contact information when you register an account on our Site. Examples of Personal Information include your name, email address, home or business address, age, demographic information, IP address, work history, education, and phone number. Additionally, non-identifying personal information, such as your username, may be linked to you through a piece of identifying personal information. For such purposes, we will treat the combined information as Personal Information. </li>
                                        <li><b>Payment Information:</b> Payment processing is handled through Stripe. We do not collect, store, or otherwise transfer financial information. See "Service Providers – Payment Processing", below for more information. </li>
                                        <li><b>Other Information. </b> During profile creation we also ask for information such as your website, and social media accounts. This information is not required, however members are welcome to enter this information for verification purposes.
                                        <b>We also have a referral page where you may enter email-addresses of friends and acquaintances.  If you choose to use to enter this information, JoBarter will send an email to your chosen recipients and your email address will be used on the message for referral.</b>
                                         </li>
                                    </ul>

                                    <h2>Information that is Passively or Automatically Collected</h2>




                                       <h4> Device/Usage Information</h4>
                                       <p className="pb-2"> We may automatically collect certain information about the computer or devices (including mobile devices or tablets) you use to access the Services. We use this information to analyze how people use our Services and enable certain features within JoBarter to better improve our site and provide a better user experience. As described further below, we may collect and analyze information such as:</p>

                                        <ul>
                                            <li>IP addresses, geolocation information, unique device identifiers, IMEI and TCP/IP address, and other information about your computer or device(s), browser types, browser language, operating system, mobile device carrier information, the state or country from which you accessed the Services; and </li>
                                            <li>Information related to the ways in which you interact with the Services, such as: referring and exit web pages and URLs, platform type, the number of clicks, domain names, landing pages, pages and content (such as advertisements) viewed and the order of those pages, statistical information about the use of the Services (such as barcodes scanned through certain of our mobile apps), the amount of time spent on particular pages, the date and time you used the Services, the frequency of your use of the Services, error logs, and other similar information.  As described further below, we may use third-party analytics providers and technologies, including cookies and similar tools, to assist in collecting this information.</li>
                                            </ul>

                                            <p>
                                                We may also collect and analyze information from your browser or device, such as, your operating system, plug-ins, system fonts, resolution and other data, for purposes of creating a unique profile  for each user.   We may use this profile to understand and analyze how you interact with the Services, to customize content or advertising to you through the Services, to monitor against fraud or misuse of the Services, and to ensure legal compliance..
                                            </p>


                                            <h4> Location Information</h4>
<p className="pb-2">JoBarter and our service providers may automatically collect location information, including general information (e.g., IP address, zip code) from your computer or mobile device.  If you access the Services through a mobile device, we may also ask you to share your specific geo-location information with us.  The Services use this location information to provide customized location-based services, content, promotional offers and other information that may be of interest to you.  We may also use location information to improve the functionality of the Services and our other products services.  If you do not wish to have this location information collected and used by JoBarter and our service providers, you may disable the location features on your personal device.  Please note that if you disable such features, you will not be able to access or receive some or all of the services, content, features and/or products made available via the Services. </p>


<h4> Cookies and Other Electronic Technologies</h4>
<p className="pb-2">We may also collect data about your use of the Services through the use of Internet server logs, cookies and/or tracking pixels. A web server log is a file where website activity is stored to distinguish you from other users of our website. A cookie is a small text file that is placed on your computer when you visit a website, that enables us to: </p>
<ul>
    <li> Recognize your computer; </li>
    <li> Store your preferences and settings; </li>
    <li> Understand the web pages of the services you have visited; </li>
    <li> Enhance your user experience by delivering content specific to your interests; </li>
    <li> Perform searches and analytics; and </li>
    <li> Assist with security administrative functions. Some cookies are placed in your browser cache while those associated with flash technologies are stored with your adobe flash player files. </li>
</ul>
<p className="pb-2">
Tracking pixels (sometimes referred to as web beacons or clear GIFs) are tiny electronic tags with a unique identifier embedded in websites, online ads and/or email, and that are designed to provide usage information like ad impressions or clicks, measure popularity of the Services and associated advertising, and to access user cookies.  As we adopt additional technologies, we may also gather additional information through other methods <br />
We use the following cookies:</p>

<ul>
    <li><b>Strictly necessary cookies.</b> These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website, use a shopping cart or make use of e-billing services.
    </li>
    <li><b> Analytical/performance cookies.</b> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.
    </li>
    <li><b> Functionality cookies.</b> These are used to recognize you when you return to our website. This enables us to personalize our content for you, greet you by name and remember your preferences (for example, your choice of language or region).
        </li>
    <li><b> Targeting cookies.</b> These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose.</li>
</ul>

<p className="pb-2">
Except for essential cookies, all cookies will expire after one year.</p>
<p className="pb-2">
Your usage of the website without changing your browser cookies settings will indicate your consent to usage of cookies in accordance with this section of this Policy. You can change your cookie settings at any time. Please note that you can change your settings to notify you when a cookie is being set or updated, or to block cookies altogether. Please consult the “Help” section of your browser for more information (e.g., Internet Explorer; Google Chrome; Mozilla Firefox; or Apple Safari). You can also manage the use of Flash technologies, including cookies and local storage objects with the Flash management tools available at Adobe’s website. Please note that by blocking any or all cookies, you may not have access to certain features or offerings of the Services.</p>
<p className="pb-2">
Please also see below the section entitled ‘Tailored Online and Mobile Advertising’ which contains further information on how cookies are used for advertising purposes by us as well as by associated third parties.</p>


<h4>Information Collected By and From Social Media and Other Content Platforms</h4>
<p className="pb-2">
If you access the Services through a third-party connection or log-in (e.g., through a social network), you may allow us to have access to and store certain information in your social network profile.  This may include your first name, last name, gender, general location, a link to your profile, your time zone, birthday, profile picture, your “likes” and your list of friends.  If you do not wish to have this information shared, do not use a social networking connection to access the Services.  For a description on how social networking sites handle your information, please refer to their privacy policies and terms of use, which may permit you to modify your privacy settings.  If you signed up using a social media log-in by mistake, you may be able to delete your account through your account settings at any time, or you can email us at <a href="mailto:contact@jobarter.com">contact@jobarter.com</a> for help.</p>
<p className="pb-2">
When you “like” or “follow” us on Facebook, Instagram, Pinterest, Twitter or other social media sites, we may collect some information from you including your name, e-mail address, and any comments or content you post relevant to us. We may also collect your information if you sign up for one of our promotions or submit information to us through social media sites.</p>

<h4>Information from Affiliates and Non-Affiliated Third Parties</h4>
<p className="pb-2">We may also obtain information about you if you use any other websites that we operate or may operate from time to time or other services we provide. We may share information amongst members of our corporate group, which means our subsidiaries, our ultimate holding company and its subsidiaries. We may also obtain information, such as demographic information, from our affiliates or from third parties, such as marketers, partners, researchers, sub-contractors in technical, payment and delivery services, advertising networks, analytics providers, search information providers, credit reference agencies and others.</p>

            <h2>Service Providers</h2>
            <h4>Payment Processing</h4>
<p className="pb-2">Payment processing is handled by Stripe, which may collect certain financial information from you, such as your name, address, credit or debit card information or ACH information, applicable card expiration dates and security codes in order to process your transactions for purchases made at JoBarter.com.</p>
<p className="pb-2">
We do not collect, store or otherwise maintain this financial information, including credit, debit or similar information from individuals who make purchases using the Services, and use and storage of that information is governed by the payment processor’s applicable terms of service and privacy policy located here.</p>



      <h2>Email</h2>
<p className="pb-2">We will use e-mail to send you news and service updates, as well as notification of messages from other users unless you "opt out" to receiving such e-mails by using the unsubscribe links within the e-mails that we send. Please note, however, that as long as you maintain an account, you may not "opt out" of receiving service or account-related e-mails from the Site.</p>

      <h2>How We Use Your Information</h2>
      <p className="pb-2">We use information collected through our Service to provide and improve the Service, process your requests, prevent fraud, provide you with information and advertising that may interest you, comply with the law, and as otherwise permitted with your consent.</p>
      <p className="pb-2">
Where relevant under applicable laws, all processing of your personal information will be justified by a "condition" for processing. In the majority of cases, processing will be justified on the basis that:</p>

            <ul>
                <li>
    You have provided your consent for us to use your personal information for a specific purpose;
    </li>
    <li>
    </li>
    <li>Our use of your personal information is necessary to perform a contract or take steps to enter into a contract with you (e.g. to provide you with services which you have purchased);
    </li>
    <li>The processing is necessary to comply with a relevant legal obligation or regulatory obligation that we have (e.g. fraud prevention)
    </li>
    <li>The processing is necessary to support our legitimate interests as a business (e.g. to improve our services to you), subject to your interests and fundamental rights and provided it is conducted at all times in a way that is proportionate.
We will use your personal information for the following purposes:
    </li>
    <li>To process a transaction initiated by you or to provide the features, services and products available through the Services;
    </li>
    <li>To send you information about your transactions with us, account alerts, or other communications, such as newsletters to which you have subscribed;
    </li>
    <li>With your consent, to send you SMS messages;
    </li>
    <li>To notify you about new features, changes and/or offerings of the Services, including, but not limited to, updates, discounts, events, shows news about our Services, products, and/or special offers;
    </li>
    <li>To provide you with quality service and security, to operate the Site and to perform our obligations to you;
    </li>
    <li>To contact you with information, surveys, or advertising that we believe may be of interest to you both regarding our products and Services and those of third parties;
    </li>
    <li> To administer sweepstakes and contests;
    </li>
    <li> To process and respond to your inquiries or to request your feedback;
    </li>
    <li> For internal research and reporting;
    </li>
    <li> To personalize the content and advertising that you see on the Services or on other websites, including across difference devices and browsers;
    </li>
    <li> To measure or understand the effectiveness of advertising we serve to you and others;
    </li>
    <li> To allow you to participate in interactive features of our service, when you choose to do so;
    </li>
    <li> To enforce the legal terms that govern your use of the Services;
    </li>
    <li> To use IP addresses to identify the location of users, to block disruptive use, to establish the number of visits from different countries and to determine the jurisdiction in which you are accessing the Services </li>
    </ul>

  <p className="pb-2">
    We may aggregate and/or de-identify information collected through the Services. We may use de-identified and/or aggregated data for any purpose, including without limitation for research and marketing purposes, and may also share such data with any third parties, including advertisers, promotional partners, sponsors, event promoters, and/or others.</p>

<h2> When We Disclose User Information</h2>
  <p className="pb-2">
We may disclose and/or share your information between members of the Sites corporate group, and to or with any non-affiliated third parties under the following circumstances:</p>

<ul>
    <li><b> Consent.</b> We may disclose your information to any third parties based on your consent to do so.</li>
    <li><b>Interactions Between Users.</b> We share your information to help facilitate interactions between Users while using the services.</li>
    <li><b>Service Providers.</b>  We may provide access to or share your information with select third parties who perform services on our behalf and for any other legitimate business purpose. These third parties provide a variety of services to us, including without limitation billing, sales, marketing, advertising, market research, customer support, fulfillment, data storage, analysis and processing, and legal services.</li>

    <li><b>Protection of Others and Us.</b> By using the Services, you acknowledge, consent and agree that we may access, preserve and disclose your information, including, but not limited to, any user content, if required to do so by law or in a good faith belief that such access, preservation or disclosure is reasonably necessary to:
    <ul>
        <li> Comply with legal process;</li>
        <li> Enforce our terms of service, this policy, or other contracts with you, including investigation of potential violations thereof;</li>
        <li>Respond to claims that any content violates the rights of third parties;</li>
        <li> Respond to your requests for customer service; and/or</li>
        <li> Protect the rights, property or personal safety of the services, its agents and affiliates, its users and/or the public.  This includes exchanging information with other companies and organizations for fraud protection, and spam/malware prevention, and similar purposes.</li>
        </ul>
        </li>
    <li><b>Business Transfers.</b> As we continue to develop our business, we may buy, merge or partner with other companies. In such transactions, (including in contemplation of such transactions, e.g., due diligence) user information may be among the transferred assets. If a portion or all of our assets are sold or transferred to a third-party, customer information (including your email address) would likely be one of the transferred business assets.</li>
    <li><b>Public Forums.</b>  Our Services offer publicly accessible blogs and community forums. You should be aware that any information you provide in these areas may be read, collected, and used by others who access them.  Please also remember that if you choose to provide information on public features of the Services, individuals reading such information may use or disclose it to other individuals or entities without our control and without your knowledge, and search engines may index that information. We therefore urge you to think carefully about what you choose to disclose publicly and make sure it’s information you want to share with the public.</li>
    </ul>


     <h2>Personalized Content, Advertising, and Your Choices </h2>
     <h4> Online and Email Analytics</h4>
 <p className="pb-2">
We may use third-party web analytics services on our Services, such as those of Google Analytics, Hotjar and Facebook.  These service providers use the sort of technology previously described in the “Cookies and other electronic technologies” section to help us analyze how users use the Services, including by noting the third-party website from which you arrive, and provide certain features to you.  We may also use Google Analytics for certain purposes related to advertising, as described in the following section. To prevent Google Analytics from using your information for analytics, you may install the Google Analytics Opt-out Browser Add-on by clicking here. </p>
 <p className="pb-2">
If you receive email from us, we may use certain tools, such as clear GIFs to capture data such as when you open our message or click on any links or banners our email contains.  This data allows us to gauge the effectiveness of our communications and marketing campaigns.</p>


  <h2>Updating Your Information and Data Retention</h2>
 <p className="pb-2">You may access certain of your information and delete, change, or modify that information through your relevant account settings on the Services.  For additional assistance with modifying or deleting information provided to us, contact us at <a href="mailto:contact@jobarter.com">contact@jobarter.com</a>.
We will keep your information only for as long as is reasonably necessary for the purpose that it has been processed, considering any legal requirements under Applicable Law. If you terminate your account, any association between your account and information we store will no longer be accessible through your account. We will also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
 <p className="pb-2">
If you wish to verify the details that we hold about you may do so by contacting us via e-mail at <a href="mailto:contact@jobarter.com">contact@jobarter.com</a>. Our security procedures mean that we may request proof of identity before we reveal information. This proof of identity will typically take the form of your e-mail address and any password submitted upon registration.</p>


<h2>Security </h2>
<p className="pb-2">
We have implemented administrative, technical, and physical security measures to protect against the loss, misuse and/or alteration of your information. These safeguards vary based on the sensitivity of the information that we collect and store. All information you provide to us is stored on secure servers. Any payment transactions will be encrypted using Secure Sockets Layer (SSL) technology. In addition, we contractually ensure that any third party processing your personal information equally provide for confidentiality and integrity of your data in a secure way.</p>

<p className="pb-2">Unfortunately, the transmission of information via the internet is not completely secure, and although we will do our best to protect your information, we cannot and do not guarantee that the measures we take will prevent every unauthorized attempt to access, use, or disclose your information since despite our efforts, as no Internet and/or other electronic transmissions can be completely secure and any transmission is at your own risk.</p>
<p className="pb-2">
You are responsible for keeping your account and password secure. It is important for you to protect against unauthorized access to your password and to your computer so we advise that you sign off when you have finished using a shared computer strongly recommend and that you do not use the browser’s password memory function as that would permit other people using your device to access your information. We recommend that you change your password periodically. You are responsible for maintaining the security of your account username and password. We ask you not to share a password with anyone. If you believe that your account username and/or password have been stolen or been made known to others, you must contact us immediately at <a href="mailto:contact@jobarter.com">contact@jobarter.com</a> and change your password immediately. We are not responsible for any actions occurring from your account if someone else accesses your account through information that they have obtained from you. To the fullest extent permitted by law, we disclaim all liability and responsibility for any damages you may suffer due to any loss, unauthorized access, misuse or alterations of any information you submit to the Service.</p>



<h2>Your Choices  </h2>
<p className="pb-2">
If you have provided contact information through the Services and decide that you do not want us to use that information for marketing purposes in accordance with this Policy, you can opt-out of future use at any time by: </p>
<ul><li>
     Using the link provided at the bottom of any email you receive and opting out of receiving future information; or
    </li>
   <li> Sending us an email at <a href="mailto:contact@jobarter.com">contact@jobarter.com</a>.  </li>
</ul>
<p className="pb-2">
Please note that you may not be able to opt out of emails about your transactions and relationship with us, such as emails regarding your account, requests or inquiries, and purchases of products and/or services.</p>


<h2>International/EU Users – Consent To Transfer and Subject Access Requests  </h2>
<p className="pb-2">
The Services are operated in the United States and are governed by United States law. If you are a resident of the European Union or other location outside the United States, please be advised that any information you provide through the Services will be transferred to the United States or other designated locations outside of the European Economic Area which do not have a similar standard of protection laws to the EU for processing, hosting and storage by us or our service providers. Where you are accessing Services from a European Union member state, we will take all steps reasonably necessary to ensure that your information is treated securely in accordance with this privacy policy always and at least to the standards required by Applicable Law in the jurisdiction of access. By using the Services, you consent to this transfer and to the use of the information as described herein.</p>
<p className="pb-2">
Under applicable EU regulation, you have the following rights in respect of your personal information to:</p>


<ul>
   <li>Obtain a copy of your personal information together with information about how and on what basis that personal information is processed;</li>
    <li>Rectify inaccurate personal information;</li>
    <li>Erase your personal information in limited circumstances where (a) you believe that it is no longer necessary for us to hold your personal information; (b) we are processing your personal information on the basis of legitimate interests and you object to such processing, and we cannot demonstrate an overriding legitimate ground for the processing; (c) where you have provided your personal information to us with your consent and you wish to withdraw your consent and there is no other ground under which we can process your personal information; and (d) where you believe the personal information we hold about you is being unlawfully processed by us;</li>

   <li> Restrict processing of your personal information where: (a) the accuracy of the personal information is contested; (b) the processing is unlawful but you object to the erasure of the personal information; (c) we no longer require the personal information for the purposes for which it was collected, but it is required for the establishment, exercise or defense of a legal claim or (d) you have objected to us processing your personal information based on our legitimate interests and we are considering your objection;</li>
   <li>
     Challenge processing which we have justified on the basis of our legitimate interest;
     </li>

     <li>
     Object to decisions which are based solely on automated processing or profiling;
     </li>

     <li>
   Locate where you have provided your personal information to us with your consent, to ask us for a copy of this data in a structured, machine-readable format and to ask us to share (port) this data to another data controller; or
   </li>

   <li>  Obtain a copy of or access to safeguards under which your personal information is transferred outside of the EEA.</li>
   </ul>
<p className="pb-2">
   In addition to the above, you have the right to lodge a complaint with a supervisory authority for data protection.</p>

<p className="pb-2">
We will ask you for additional data to confirm your identity and for security purposes, before disclosing data requested to you. We reserve the right to charge a fee where permitted by law. We will decline to process requests that jeopardize the privacy of others, are extremely impractical, or would cause us to take any action that is not permissible under applicable laws. Additionally, as permitted by applicable laws, we will retain where necessary certain personal information for a limited period of time for record-keeping, accounting and fraud prevention purposes.</p>
<p className="pb-2">
Where, under Applicable Law, you are entitled to access information held about you and to request that it is corrected if any of your details held are incorrect. Your right of access can be exercised in accordance with the provisions of Applicable Law. Any access request will be subject to the maximum fee permissible under Applicable Law in order to meet our costs in providing you with details of the information we hold about you.</p>

<h2>Third Party Links and Services   </h2>
<p className="pb-2">
The Services may contain links to third-party websites, applications and other services. Please be aware that we are not responsible for the privacy practices of such other sites and services. We encourage our users to be aware when they leave our Services and to read the privacy statements of each and every site they visit that collect their information.  Some of these links may be affiliate marketing links encoded by third parties.  This means that we may earn a commission when you click on or make purchases via affiliate links, and affiliate partners may use cookies to understand your use of the Services.  For more information about our affiliate marketing practices, please see the Site’s Advertising Disclosure.</p>
<p className="pb-2">
The Services may also include widgets and social media features such as the Facebook “Like” button, which are interactive mini-programs that provide specific services from another company (e.g. displaying the news, opinions, music, etc.). Information such as your email address may be collected through these features. These features may collect your IP address and set cookies to enable them to function properly.  We are not responsible for nor do we endorse the privacy practices or the content of such third-party services.  Any information you provide via those services is subject to their applicable privacy policies and is not covered by this Policy.</p>

<h4>Your California Privacy Rights </h4>
<p className="pb-2">
California Law permits visitors who are California residents to request a list of the third parties to which we have disclosed “personal information” (as that term is defined under applicable California law) for such third parties’ direct marketing purposes.  You are limited to one request per calendar year. In your request, please attest to the fact that you are a California resident and provide a current California address for our response. You may request the information in writing at <a href="mailto:contact@jobarter.com">contact@jobarter.com</a>. </p>


<h2>Information From Children </h2>
<p className="pb-2">
The Services are not directed to anyone under the age of 13 and such children are not permitted to use the Services. If we discover we have received any “personal information” (as defined under the Children’s Online Privacy Protection Act) from a child under the age of 13 in violation of this Policy, we will take reasonable steps to delete that information as quickly as possible. If you believe we have any information from or about anyone under the age of 13, please contact us at <a href="mailto:contact@jobarter.com">contact@jobarter.com</a>.</p>


<h2>Changes To This Policy</h2>
<p className="pb-2">We will continue to evaluate this Policy as we update and expand the Services and our offerings, and we may make changes to the Policy accordingly. If we make any material changes to this Policy, we will notify you through email. We will also notify you by amending the revision date of this page. The newly updated privacy statement will apply from the listed revision date.  Your continued use of the Services will signify acceptance of the terms of the updated Policy.</p>
<p className="pb-2">
We reserve the right to change this Policy at any time to reflect changes in the law, our data collection and use practices, the features of our Services, or advances in technology. Please check this page so that you may periodically review this statement and be aware of any changes. . Your continued use of the Services following the posting of changes to this Policy will mean you accept those changes.</p>

<h2>Questions About Policy </h2>
<p className="pb-2">
If you have any questions about our Policy, you can contact us by emailing us at <a href="mailto:contact@jobarter.com">contact@jobarter.com</a>.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Main>);
    }
}

export default PrivacyPolicy;