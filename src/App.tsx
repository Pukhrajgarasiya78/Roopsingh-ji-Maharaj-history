import React, { useState, useRef } from 'react';
import { Book, ChevronRight, ChevronLeft, Crown, Sword, Users, Heart, History, MapPin, Flame, Feather, Menu, X, Home, Phone, Mail } from 'lucide-react';

// --- YOUR CONTACT DETAILS (CHANGE HERE) ---
const CONTACT_INFO = {
  name: "Pukhraj Garasiya",
  phone: "+91 7828803429",
  email: "pukharajgarasiya@gmail.com",
  address: "Gram Pokharada Manasa Neemuch, Madhya Pradesh, India"
};

// --- Types & Data ---

type ViewState = 'cover' | 'chapters' | 'contact';

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  content: string[];
  icon: React.ReactNode;
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: "प्रस्तावना",
    subtitle: "गरासिया गौरव की आरंभ कथा",
    icon: <Book className="w-5 h-5" />,
    content: [
      "सदियों की धूल में दबे वो अध्याय, जहाँ वीरता केवल तलवारों की खनक से नहीं, बल्कि अटल स्वाभिमान और त्याग से जन्म लेती है—उन्हीं अमर पन्नों में श्री रूपसिंह जी महाराज का नाम स्वर्णाक्षरों में अंकित है। उनका जीवन केवल एक व्यक्ति की कहानी नहीं, बल्कि एक संपूर्ण समुदाय के पुनर्जागरण, संघर्ष और गौरव का दीपस्तंभ है।",
      "गौड़ सोडावत राजपूत वंश के इन महापुरुषों ने सामाजिक मर्यादाओं की जंजीरों को तोड़कर 'गरसिया' नाम की एक नई, तेजस्वी और अदम्य पहचान को जन्म दिया—एक ऐसी पहचान, जो आज भी गर्व, साहस और अस्मिता की जीवित मिसाल है।",
      "यह इतिहास किसी दरबारी अभिलेख में कैद नहीं, बल्कि बामनिया भाटों के कंठ से निकली कथाओं, लोकगाथाओं और भजनों में आज भी धड़कता है। यह पुस्तक उस प्रामाणिक (आदिल) विरासत को शब्द देती है, ताकि आने वाली पीढ़ियाँ अपने पूर्वज रूपसिंह जी महाराज के शौर्य, त्याग और लोकधर्म की उस अनोखी यात्रा को समझकर गर्व अनुभव कर सकें।"
    ]
  },
  {
    id: 2,
    title: "उद्गम: अमरकोट से पुंगलगढ़",
    subtitle: "सोडावत वंश की वीर यात्रा",
    icon: <Crown className="w-5 h-5" />,
    content: [
      "मारवाड़ की वीर भूमि पर अवस्थित पुंगलगढ़—अब पाकिस्तान की सीमाओं में समाया यह दुर्ग—कभी सूर्यवंशी गौड़ राजपूतों की अस्मिता का अभेद प्रतीक था। इसी गौरवशाली सोडावत वंश में राजा नरसिंह जी जैसे प्रतापी शासक का उदय हुआ। उनके पुत्र तोलासिंह जी के गृह में जन्मे दो ऐसे शूरवीर, जिनकी कीर्ति की छाया दिल्ली के तख़्त तक फैल चुकी थी।",
      "बड़े पुत्र गेम सिंह—जिन्हें प्रेमपूर्वक गोपा जी कहा जाता—और छोटे पुत्र पछाड़ सिंह, दोनों ही अद्वितीय पराक्रम और विलक्षण प्रतिभा के धनी थे। दिल्ली सल्तनत की शाही फौज में वे ऊँचे पदों पर आसीन थे। गोपा जी युद्धकला में जितने निपुण थे, उतनी ही अद्भुत कुशलता उन्हें चित्रकला में प्राप्त थी। दिल्ली दरबार में उनका यश, साहस और कला—सभी समान रूप से प्रशंसित थे।",
      "उनका जीवन राजसी सम्मान, वैभव और अपराजेय पराक्रम से आलोकित था। किंतु उन्हें यह ज्ञात न था कि नियति उनकी अग्निपरीक्षा लेकर उन्हें उस मार्ग पर ले जाने वाली है, जिसकी परिणति आगे चलकर गरासिया समाज की गौरवशाली पहचान को जन्म देगी—एक ऐसी पहचान, जो समय बीतने पर भी और अधिक तेजस्वी होती चली गई।"
    ]
  },
  {
    id: 3,
    title: "कलाकार का अपमान और पलायन",
    subtitle: "दिल्ली दरबार से स्वाभिमान की रक्षा",
    icon: <MapPin className="w-5 h-5" />,
    content: [
      "एक दिन सुल्तान ने गेम सिंह को अपनी रानी का चित्र बनाने का आदेश दिया। गेम सिंह ने अपनी कला से इतना सजीव चित्र बनाया कि सुल्तान प्रसन्न हो गया। परंतु, भूलवश रंग का एक छोटा सा छींटा रानी के पैर पर गिर गया, जो हूबहू तिल जैसा लग रहा था।",
      "दरबार में छिपी ईर्ष्या ने इसे षड्यंत्र बना दिया। मंत्रियों ने सुल्तान के कान भर दिए: 'हुज़ूर, चित्रकार को रानी के गुप्त तिल का पता कैसे चला?' शक की आग में अंधे होकर सुल्तान ने बिना सत्य जाने दोनों भाइयों को मृत्युदंड का फरमान सुना दिया।",
      "अपने स्वाभिमान और प्राणों की रक्षा के लिए, दोनों भाइयों ने दिल्ली के शाही वैभव को त्यागने का निर्णय लिया। उसी रात, वे अपने घोड़ों पर सवार होकर अनिश्चित भविष्य की ओर निकल पड़े, जबकि शाही सेना उन्हें मारने के लिए पीछा कर रही थी।"
    ]
  },
  {
    id: 4,
    title: "चमत्कार: माँ लाला नायण सती",
    subtitle: "दैवीय संरक्षण का वरदान",
    icon: <Flame className="w-5 h-5" />,
    content: [
      "दिल्ली से निकलकर दोनों भाई एक घने जंगल में पहुँचे। वहाँ उन्होंने एक स्त्री को विलाप करते देखा। यह माँ लाला नायण थीं, जिनके पति को सर्प ने डस लिया था और वह उनके मृत शरीर को गोद में लेकर रो रही थीं। उन्होंने दोनों भाइयों को रोककर अपने पति के साथ सती होने की इच्छा प्रकट की।",
      "भाइयों ने अपनी विवशता बताई कि उनके पीछे शाही सेना पड़ी है और वे रुक नहीं सकते। इस पर माँ लाला सती ने अपने दिव्य तेज से कहा, “तुम उसकी चिंता मत करो। मैं उन्हें रोक दूँगी।” उन्होंने भाइयों को गाय का गोबर लाने को कहा। जैसे ही माँ लाला सती ने उस गोबर को अपने हाथ पर रखा, वह उनके सतीत्व के प्रभाव से एक नारियल में परिवर्तित हो गया।",
      "उन्होंने उस नारियल वाले हाथ को फौज की दिशा में किया और एक क्षण में ही भयंकर आँधी-तूफान ने सेना का मार्ग रोक दिया। मुगल सेना भयभीत होकर वापस लौट गई। इसके बाद, दोनों भाइयों ने चंदन की लकड़ी से चिता तैयार की और माँ लाला नायण को सती करवाया। चिता पर बैठी माँ लाला सती ने दोनों भाइयों को आशीर्वाद दिया:",
      "मेरा नाम लेकर जो भी कार्य करोगे, वह अवश्य सफल होगा। जो भाई मेरे सिर की ओर खड़ा है (गेम सिंह), उसे माथे राज मिलेगा। और जो पैरों की ओर खड़ा है (पछाड़ सिंह), उसे पग-राज्य (यानी नेतृत्व और सम्मान) मिलेगा। यह वरदान देकर वह दिव्य ज्योति में विलीन हो गईं। आज भी माँ लाला सती, श्योपुर के आगे कल्याण बड़ोद क्षेत्र के डांग में पूजनीय हैं।"
    ]
  },
  {
    id: 5,
    title: "बड़ोद का राज्य और मेवाड़ आगमन",
    subtitle: "माँ लाला सती के वरदान की सिद्धि",
    icon: <Sword className="w-5 h-5" />,
    content: [
      "माँ लाला सती का आशीर्वाद लेकर दोनों भाई बड़ोद पहुँचे। वहाँ के राजा की पुत्री का स्वयंवर हो रहा था, जिसकी शर्त थी कि जो भी राजकुमार दरबार में रखे पत्थर के हाथी में भाला गाड़ देगा, उसी से राजकुमारी का विवाह होगा।",
      "छोटे भाई पछाड़ सिंह ने माँ लाला सती का स्मरण किया और भाला मारा, जो सीधा पत्थर के हाथी के भीतर चला गया। पूरा दरबार आश्चर्यचकित रह गया। जब राजा के सैनिक उन्हें बुलाने आए, तो पछाड़ सिंह ने अपने बड़े भाई का सम्मान करते हुए कहा, “यह पराक्रम मेरा नहीं, मेरे बड़े भाई गेम सिंह का है।” उन्होंने गेम सिंह से जाकर भाला निकालने का अनुरोध किया।",
      "गेम सिंह ने माँ लाला सती का नाम लेकर सहजता से भाला निकाल दिया। उनका विवाह राजकुमारी से हुआ, और चूँकि बड़ोद के राजा निःसंतान थे, उन्होंने गेम सिंह को ही अपना उत्तराधिकारी घोषित कर दिया। इस प्रकार, माँ लाला सती की भविष्यवाणी पूर्ण हुई और बड़े भाई को राज्य प्राप्त हुआ।",
      "अपने भाई को राज्य सौंपकर, छोटे भाई पछाड़ सिंह “पग-राज्य” के अपने भाग्य को सिद्ध करने मेवाड़ की ओर चले आए। एक स्थान पर ठहरने के बजाय, उन्होंने अपने वंश को मेवाड़ की भूमि पर स्थापित किया, और यहीं से उस महान वंश की नींव पड़ी, जिसमें आगे चलकर श्री रूपसिंह जी महाराज का जन्म होना था।"
    ]
  },
  {
    id: 6,
    title: "अवतार: श्री रूपसिंह जी महाराज",
    subtitle: "गरासिया इतिहास का उदय",
    icon: <Heart className="w-5 h-5" />,
    content: [
      "पछाड़ सिंह, जिन्होंने अपने बड़े भाई के लिए राज्य का त्याग कर दिया था, मेवाड़ की वीर भूमि पर अपने वंश की पताका फहराई। उनकी वंशावली में एक से बढ़कर एक वीर उत्पन्न हुए—पछाड़ सिंह के पुत्र नाहर सिंह, नाहर सिंह के पुत्र बिरम सिंह, और बिरम सिंह के पुत्र आशा सिंह।",
      "इसी गौरवशाली वंश में आशा सिंह के घर दो तेजस्वी पुत्रों का जन्म हुआ—श्री रूपसिंह जी महाराज और सूरजमल जी। बाल्यकाल से ही दोनों भाइयों में पराक्रम, शौर्य और स्वाभिमान की ज्योति प्रज्वलित थी।",
      "रूपसिंह जी का विवाह कछवाहा राजपूत वंश की राजकुमारी माँ खेमा से हुआ—जो रूप और गुण दोनों में ही लक्ष्मी का स्वरूप थीं। माँ खेमा ने रूपसिंह जी के चार पराक्रमी पुत्र—गोविंद, गोपाल, धनराज और मोकुल—को जन्म दिया, जो आगे चलकर गरसिया वंश के आधार स्तंभ बने।"
    ]
  },
  {
    id: 7,
    title: "गरीबों के रक्षक और 'बामणिया के ठाकुर'",
    subtitle: "न्याय, पराक्रम और लोकधर्म",
    icon: <Users className="w-5 h-5" />,
    content: [
      "श्री रूपसिंह जी महाराज अपनी प्रजा के दुःख से अत्यंत द्रवित हो जाते थे। उन्होंने देखा कि धनी व्यापारी गरीबों का शोषण कर रहे हैं, तो उन्होंने धर्म की रक्षा के लिए शस्त्र उठाए। वे उन व्यापारियों से धन लेकर उसे गरीबों और जरूरतमंदों में बाँट देते थे। उनके इस कार्य से वे गरीबों के मसीहा और रक्षक बन गए।",
      "इसकी शिकायत जब मेवाड़ के राजा (महाराजा अड़ीक) तक पहुँची, तो उन्होंने रूपसिंह जी को दरबार में बुलाया। महाराज निडर होकर दरबार में पहुँचे और राजा के पूछने पर कहा, 'राजन, मैं एक राजपूत सरदार हूँ। यदि मैं अपनी गरीब प्रजा का पालन-पोषण नहीं करूँगा, तो और कौन करेगा?'",
      "राजा, रूपसिंह जी की निडरता, सच्चाई और प्रजा के प्रति प्रेम से बहुत प्रभावित हुए। उन्होंने श्री रूपसिंह जी महाराज को बनास नदी के किनारे 12 गाँवों की जागीर प्रदान की। उसी दिन से, महाराज बामणिया के ठाकुर कहलाए और उनकी कीर्ति चारों दिशाओं में फैल गई।"
    ]
  },
  {
    id: 8,
    title: "मुनीम कुंता जी माली और बामणिया भाट",
    subtitle: "बामणिया भाट परंपरा की शुरुआत",
    icon: <Users className="w-5 h-5" />,
    content: [
      "श्री रूपसिंह जी महाराज के मुनीम कुंता जी माली समाज के थे। वे 12 गाँवों में जाकर खेतों से माल कुंता करते थे। उनकी स्मृति में गाँव के उत्तर में बनास नदी के उस पार चबूतरे पर मूर्ति स्थापित है, जिसकी पूजा आज भी माली समाज द्वारा की जाती है।",
      "एक बार राजा शिकार पर आए और पास ही श्री रूपसिंह जी महाराज अपने तंबू में विश्राम कर रहे थे। सैनिकों ने पानी माँगा और महाराज ने पानी दिया। राजा ने पानी पिया तो बोले कि यह साधारण पानी नहीं है, इसमें तो केसर, दाख, बादाम का स्वाद आ रहा है। यह पानी कहाँ से लाए हो?।", 
      "सैनिकों ने तंबू की ओर इशारा किया। जब पता चला कि पानी तंबू से आया है तो राजा ने बाहर से तीन बार आवाज दी—‘अंदर कौन है?’ अंदर से उत्तर आया—‘हम भाट हैं।’ राजा ने कहा—‘आज से तुम राजपूत होकर भी भाट कहलाओगे।’ उसी दिन से हम बामणिया भाट कहलाए।",
       ]
  },
  {
    id: 9,
    title: "रूपसिंह जी महाराज द्वारा नई जाति का निर्माण",
    subtitle: "गरासिया, सूरावत, कछावा, दायमा व अन्य गोत्रों का समेकन",
    icon: <Users className="w-5 h-5" />,
    content: [
      "कुछ समय बाद दरबार में कुछ मंत्री ईर्ष्या के कारण यह बात फैलाने लगे कि सब बिना शस्त्र के बैठते हैं और केवल रूपसिंह जी महाराज सशस्त्र बैठते हैं। उन्होंने राजा से कहा कि ये असली राजपूत नहीं हैं। राजा ने उनसे बड़वे पोथी दिखाने को कहा। रूपसिंह जी नाराज होकर सभा छोड़ आए, और मन में नई जाति बनाने का निश्चय कर लिया।",
      "धनराज पंडित उन्हें हरिद्वार लेकर गए। हरिद्वार में स्नान के दौरान उन्होंने कहा— “महाराज, इसी समय मेरा पुत्र जंगल में शेर का शिकार हो रहा है।” महाराज ने वही समय लिख लिया। लौटने पर पता चला कि धनराज पंडित का पुत्र वास्तव में उसी घड़ी शेर ने मार दिया था। इस चमत्कार के बाद रूपसिंह जी ने धनराज पंडित को अपना कुल ब्राह्मण मान लिया। अब किसी भी शुभ कार्य का मुहूर्त वे धनराज पंडित से ही लेते थे। महाराज ने उनसे कहा— “मुझे नई जाति बनानी है, कोई शुभ मुहूर्त बताओ।” किंवदंती के अनुसार, सन 1431 माह सूद पूनम गुरुवार अति श्रेष्ठ मुहूर्त बताया गया।",
      "कई मान्यताओं के अनुसार, जब रूपसिंह जी महाराज ने अपने मोसेरे भाई एकलमल चावड़ा का वध किया, तब उदयपुर दरबार में उनके प्रति घृणा बढ़ गई। राजपूत सरदार उनके साथ बैठने तक को तैयार नहीं हुए और उन्हें हत्यारा कहा जाने लगा।अपमानित होकर रूपसिंह जी दरबार छोड़कर बाहर आ गए और आगे चलकर नई जाति बनाने का निर्णय लिया। कहते हैं कि प्रारंभ में उनके साथ केवल कुछ राजपूत गोत्र ही आए— गरासिया (जिसमें रूपसिंग जी महाराज ने अपना गोत्र अपनाया या नया बनाया), कछावा राजपूत (जहाँ महाराज का ससुराल था) दायमा राजपूत (जहाँ उनके पुत्र मोकल का ससुराल था) सुरावत राजपूत (उनके भाई सूरजमल जी के नाम पर) बाद में मोकल गरासिया ने बाकी गोत्रों को जोड़कर जाति का विस्तार किया।"
    ]
  },
  {
    id: 10,
    title: " रूपसिंह जी महाराज का उदयपुर आगमन",
    subtitle: "वचन और वीरता की पहली परीक्षा",
    icon: <Sword className="w-5 h-5" />,
    content: [
      "एकलमल चावड़ा बड़ा वीर था— 1.25 मन का भाला रखता था, जबकि महाराज 1 मन का भाला रखते थे। आस-पास के गाँव उनसे डरते थे क्योंकि वे धड़ा डालने और बारात लूटने लगे थे, जिससे प्रजा परेशान हो गई। एक बार उन्होंने उदयपुर की रानी के काफिले को भी लूट लिया, जिससे राजा बहुत क्रोधित हो गए।, जिससे राजा ने महाराज को बुलावा भेजा। महाराज ने वचन दिया और समय पर अवश्य पहुँचूँगा। ",
       "तब रूपसिंग जी महाराज अपने अस्त्र-शस्त्र धारण करके अपने सफेद रंग के घोड़े को लेकर उदयपुर की ओर निकल गए। उदयपुर के राजा रूपसिंग जी महाराज की परीक्षा लेना चाहते थे, तो उन्होंने द्वारपाल को कह दिया था कि रूपसिंग जी के लिए दरवाजा खुला न करे। जब रूपसिंग जी महाराज दरवाजे पर आए तो उन्होंने कहा कि उन्हें राजा से मिलना है, पर द्वारपाल ने दरवाजा नहीं खोला। समय निकले जा रहा था और वचन निभाना था", 
       "तो रूपसिंग जी महाराज ने अपने घोड़े से कहा कि वह उनके वचन का मान रखे। इतना सुनते ही रूपसिंग जी महाराज के घोड़े ने ऊँची छलांग लगाई और किले की दीवार को लांघता हुआ दूसरी दीवार पर जा पहुंचा। कहा जाता है कि आज भी दूसरी दीवार पर उसके दोनों पैर के निशान दिखायी देते हैं। जब रूपसिंग जी महाराज सभा में पहुंचे तो सभी चकित हो गए और तब ही उनकी वीरता पर भरोसा हो गया।",
       "फिर राज्य सभा में बीड़ा घुमाया गया, पर यह नहीं बताया गया कि करना क्या है, बीड़ा लेने के बाद ही बताया जाएगा। जब बीड़ा रूपसिंग जी महाराज के पास पहुंचा तो उन्होंने कहा, 'मैं राजपूत हूँ और किसी भी बीड़ा को पूरा करने का दम रखता हूँ।' तब रूपसिंग जी महाराज ने वह बीड़ा ले लिया और राजा ने रूपसिंग जी महाराज से वचन लिया। तब राजा ने बताया कि उन्हें एकलमल चावड़ा को मारना है।", 
       "मगर एकलमल चावड़ा रूपसिंग जी महाराज का मौसेरा भाई था, लेकिन उन्होंने वचन दे दिया था, तो वह पीछे नहीं हट सकते थे। अतः उन्होंने यह कार्य स्वीकार कर लिया।"
    ]
  },
  {
    id: 11,
    title: "धर्म युद्ध: एकलमल चावड़ा (अंतिम संग्राम)",
    subtitle: "मौसेरे भाइयों का निर्णायक द्वंद्व",
    icon: <Sword className="w-5 h-5" />,
    content: [
      "श्री रूपसिंह जी महाराज एकल मल के घर आकर बोले, मौसी जी, मैं आपके बेटे को मारने आया हूँ। तो मौसी जी बोलीं, अरे रूपसिंह, क्यों मौत के मुँह में आया है? मेरे पुत्र एकल मल को मारने वाला अभी पैदा नहीं हुआ है। इतने में ही एकल मल भी वहाँ आ गए। दोनों में बातचीत हुई, तो रूपसिंह जी महाराज ने पूरी बात बताई। तब एकल मल चावड़ा ने कहा, तुम भी राजपूत हो और मैं भी। आप अपने वचन से पीछे नहीं हट सकते और मैं भी युद्ध करने के लिए मना नहीं कर सकता।",
       "तब उन्होंने कहा, अब हम में से कोई एक ही जीवित रहेगा। उन्होंने कहा, आख़िरी बार अफीम का प्याला लेते हैं। दोनों भाई घोड़े पर बैठ गए और एक-दूसरे को प्याला भाले की नोक पर रखकर पिलाया। दोनों के बीच घमासान युद्ध हुआ। जब युद्ध का कोई परिणाम नहीं निकला", 
       "तो यह तय हुआ कि एक भाई लगातार तीन वार करेगा और दूसरा बचेगा, फिर दूसरे की बारी आएगी। एकल मल चावड़ा ने कहा, मैं बड़ा भाई हूँ, पहले तीन वार मेरी ओर से होंगे। रूपसिंह जी महाराज ने यह बात मान ली। एकल मल ने तीन वार किए, लेकिन रूपसिंह जी महाराज हर बार बच गए। फिर रूपसिंह जी महाराज की बारी आई। उन्होंने माँ लाला सती का स्मरण किया और अपने वार से एकल मल चावड़ा को मार दिया। कहा जाता है कि युद्ध में उन्होंने एकल मल चावड़ा का सिर धड़ से अलग कर दिया।",
       "जब रूपसिंह जी महाराज ने एकल मल चावड़ा को मार दिया, तो उनकी माँ गुस्सा हो गईं। मौसी जी ने कहा, रूपसिंह, एकल मल की बहू को अपने घर में बिठा, वरना तुझे उसका श्राप झेलना पड़ेगा। श्री रूपसिंह जी महाराज ने कहा, मौसी, मुझ पर विश्वास रखो, इसका जवाब मैं कुछ दिनों बाद दूँगा।"
    ]
  },
  {
    id: 12,
    title: "प्रतिशोध और छल",
    subtitle: "मेगल सिंह मागलिया द्वारा षड्यंत्र",
    icon: <History className="w-5 h-5" />,
    content: [
      "जब वह उदयपुर गए तो सभी मंत्री और राजपूत सरदार रूपसिंह जी महाराज से घृणा करने लगे क्योंकि रूपसिंह जी महाराज ने अपने भाई एकल मल चावड़ा को मारा था। तब रूपसिंह जी महाराज गुस्से में वहाँ से चले गए और बाद में गरासिया बन गए।", 
      "बामणिया जाकर श्री धनराज पंडित को सारा वृत्तांत बताया। यहाँ आकर, श्री रूपसिंह जी महाराज ने श्री चारभुजा नाथ मंदिर का निर्माण करवाया। सात तालाब बनाए, जो बामणिया और झुंददा के बीच आज भी मौजूद हैं। ब्राह्मण की कन्याओं की विवाह करवाए और कई दान-पुण्य किए। अंत में, श्री रूपसिंह जी महाराज ने सभी जाति भाइयों और धनराज पंडित आदि के समझाने पर धाना बाई से विवाह करने को तैयार हो गए।",
      "विवाह के लिए हस्ती दाँत के चूड़ा लेने समदड़ी, जोधपुर गए। इधर, एकल मल चावड़ा के मामा मेगल सिंह मागलिया, औरत के कपड़े पहनकर कटार लेकर झुंददा के पास जंगल में रो रहे थे। औरत को रोता देख, श्री रूपसिंह जी महाराज ने श्री बगड़ा गौड़ को कहा, जाओ, उस औरत से पूछो कि उसे क्या दुख है। पूछने पर उन्होंने कहा कि जो घोड़े पर बैठा है, मैं उसी को अपना दुख बताऊँगी।",
      "श्री रूपसिंह जी महाराज घोड़े से उतरकर, औरत की तरफ पीठ करके खड़े हो गए और बोले, बताओ तुम्हें क्या दुख है। तभी उसने कटार निकालकर श्री रूपसिंह महाराज की पीठ के नीचे पेड़ की तरफ कटार मार दी।", 
      "श्री रूपसिंह जी महाराज बोले, मामा, मैंने तुम्हें पहचान लिया है, पर तुम औरत के कपड़े में हो, इसीलिए तुम्हें जिंदा छोड़ रहा हूँ। यहाँ एक और किंवदंती है कि महाराज पानी पीने बावड़ी में उतरे, वहाँ पर कटार मारी थी। महाराज ने कहा, मैं राजपूत हूँ और राजपूत किसी औरत पर हाथ नहीं उठाते। यह कहकर श्री रूपसिंह जी महाराज ने अपने दुपट्टे से पेट बाँध लिया और चल दिए। "
     ]
  },
  {
    id: 13,
    title: "बलिदान: गाथा श्याम",
    subtitle: "रूपसिंह जी महाराज का देवलोकगमन",
    icon: <Feather className="w-5 h-5" />,
    content: [
      "वहाँ विवाह की तैयारी पूरी हो चुकी थी। सभी लोग भोजन करने के लिए श्री रूपसिंह जी महाराज को बुलाने लगे। महाराज ने कहा, आप भोजन ग्रहण करो। मैं अभी नहीं खाऊँगा। पर लोग नहीं माने और उन्हें भोजन के लिए पंगत में बिठा लिया। फिर दुपट्टा हटाने को कहा और जिद पर अड़ गए। इस पर रूपसिंह जी महाराज ने खड़े होकर कहा, भाइयों, अब मेरा बुलावा आ गया है। मुझे अब जाना होगा। और दुपट्टा हटाते ही वे देवलोक को प्रस्थान कर गए।",
      "कहते हैं, इसी वक्त जात बनाई श्री धनराज ब्राह्मण, पाड़िया, लक्ष्मण ढोली, राव, हरिया बलाई, बिछवा नाई। बलाई और नाई वंश अब नहीं हैं। और रूपसिंह बोले, पीढ़ी पत गधे गाल लगा दी और कहा, यह करवा जिसमें गरासिया, सूरावत, कछावा, दायमा और 1 से 2 और गोत्र का लहू इकट्ठा कर, पवित्र भूमि बामणिया से थोड़ी दूर, जोडदा के पास जहाँ श्री रूपसिंह जी महाराज को कटार मारी गई थी, घाट हुई, वहाँ ले जाकर गाड़ दो। उसी कारण से गाथा श्याम नाम पड़ा है, जहाँ श्री रूपसिंह जी महाराज के पदचिन्ह आज स्थापित हैं।", 
      "गाथा श्याम में बाप जी की पौने तीन सौ बीघा जमीन है, जिस पर आज तक कोई अतिक्रमण नहीं कर पाया। सुना है भूमि पर पेड़ काटने व अतिक्रमण करने पर तुरंत परिणाम भुगतना पड़ता है।", 
      "माँ धाना सती को केवल चूड़ा का दाग था। उन्होंने महाराज का मुख तो नहीं देखा था। उन्होंने कहा, बड़ी बहन, आपके छोटे-छोटे राजकुमार गोविंद, गोपाल, धनराज, और मोकल उनको बड़ा करना है तो आप सती मत हो। खेमा सती, आप भी सती हैं, परंतु आप राजकुमारों का पालन-पोषण करना। बड़ी खेमा सती मान गई और छोटी धाना सती श्री रूपसिंह जी महाराज के सिर को गोदी में लेकर सती हो गई।"
    ]
  }
];

// --- Components ---

const CoverPage = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-amber-200 text-center p-8 relative overflow-hidden border-8 border-double border-orange-900">
    <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-orange-800 rounded-tl-3xl"></div>
    <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-orange-800 rounded-tr-3xl"></div>
    <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-orange-800 rounded-bl-3xl"></div>
    <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-orange-800 rounded-br-3xl"></div>

    <div className="z-10 max-w-3xl flex flex-col items-center w-full">
      <div className="mb-6 animate-fade-in-down w-full px-4">
        <Crown className="w-16 h-16 mx-auto text-orange-700 mb-4 drop-shadow-lg" />
        <h2 className="text-xl md:text-2xl font-serif text-orange-800 tracking-widest uppercase mb-2">The Royal Chronicle of</h2>
        <h1 className="text-4xl md:text-7xl font-bold font-serif text-red-900 drop-shadow-md mb-6 leading-tight">
          Shri Roopsingh Ji<br />Maharaj
        </h1>
        
        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 rounded-full border-4 border-double border-orange-800 shadow-2xl overflow-hidden bg-orange-100">
            <img 
               src="/horse.jpg" 
               alt="Shri Roopsingh Ji Maharaj" 
               className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=Image+Not+Found";
               }}
            />
        </div>

        <div className="h-1 w-32 bg-orange-700 mx-auto mb-6"></div>
        <p className="text-lg md:text-xl text-orange-900 font-serif italic mb-8 px-4">
          "अमरकोट से मेवाड़ तक: त्याग, वीरता और गौरव की अमर गाथा"
        </p>
      </div>
      
      <button 
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-red-900 font-serif border-2 border-orange-400 rounded-full hover:bg-red-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-xl"
      >
        <span>गाथा पढ़ें (Read History)</span>
        <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
    
    <div className="absolute inset-0 opacity-10 pointer-events-none" 
         style={{
           backgroundImage: 'radial-gradient(circle at 2px 2px, #7c2d12 1px, transparent 0)',
           backgroundSize: '40px 40px'
         }}>
    </div>
  </div>
);

// UPDATED: Scrollable Contact Page
const ContactPage = () => (
  <div className="flex-1 h-full overflow-y-auto bg-orange-50/50">
     <div className="min-h-full flex items-center justify-center p-4 md:p-6">
        <div className="max-w-2xl w-full bg-[#fffaf0] p-6 md:p-12 rounded-lg shadow-2xl border-4 border-double border-orange-200 text-center relative my-4">
            <Crown className="w-10 h-10 md:w-12 md:h-12 mx-auto text-orange-800 mb-4 md:mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-red-900 mb-2">संपर्क सूत्र</h2>
            <h3 className="text-lg md:text-xl text-orange-700 font-serif italic mb-8 md:mb-10">Contact Information</h3>
            
            <div className="space-y-6 md:space-y-8">
                <div className="flex flex-col items-center group">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
                        <Phone className="w-6 h-6 md:w-8 md:h-8 text-orange-800" />
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-gray-700">Phone Number</h4>
                    <p className="text-xl md:text-2xl font-serif text-red-900">{CONTACT_INFO.phone}</p>
                </div>

                <div className="flex flex-col items-center group">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
                        <Mail className="w-6 h-6 md:w-8 md:h-8 text-orange-800" />
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-gray-700">Email Address</h4>
                    <p className="text-lg md:text-xl font-serif text-red-900 break-all">{CONTACT_INFO.email}</p>
                </div>

                <div className="flex flex-col items-center group">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
                        <MapPin className="w-6 h-6 md:w-8 md:h-8 text-orange-800" />
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-gray-700">Address</h4>
                    <p className="text-lg md:text-xl font-serif text-red-900 px-2 md:px-4 leading-relaxed">
                        {CONTACT_INFO.address}
                    </p>
                </div>

                <div className="pt-6 md:pt-8 border-t border-orange-100 mt-6 md:mt-8">
                    <p className="text-sm md:text-base text-gray-500 italic">"Gaud Sodawat Rajputs Heritage"</p>
                </div>
            </div>
        </div>
     </div>
  </div>
);

const LineageTree = () => (
  <div className="bg-amber-50 p-6 rounded-lg border-2 border-orange-200 my-8 shadow-inner overflow-x-auto">
    <h3 className="text-center text-2xl font-serif text-red-900 mb-6 border-b border-orange-300 pb-2 min-w-[300px]">
      राजसी वंशावली (Royal Lineage)
    </h3>

    <div className="flex flex-col items-center space-y-4 min-w-[300px]">

      <div className="p-3 bg-[#fffaf0] border border-orange-300 rounded shadow-sm w-48 text-center font-semibold text-orange-900">
        अमरकोट (उद्गम)
      </div>

      <div className="h-6 w-0.5 bg-orange-300"></div>

      <div className="p-3 bg-[#fffaf0] border border-orange-300 rounded shadow-sm w-48 text-center font-semibold text-orange-900">
        राजा नरसिंह जी <br />
        <span className="text-xs text-gray-500">(पुंगलगढ़)</span>
      </div>

      <div className="h-6 w-0.5 bg-orange-300"></div>

      <div className="p-3 bg-[#fffaf0] border border-orange-300 rounded shadow-sm w-48 text-center font-semibold text-orange-900">
        तोलासिंह जी
      </div>

      <div className="h-6 w-0.5 bg-orange-300"></div>

      {/* Ghem Singh & Pachad Singh */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-16">
        <div className="flex flex-col items-center">
          <div className="p-3 bg-orange-100 border border-orange-400 rounded shadow-sm w-48 text-center font-bold text-orange-800">
            गेम सिंह (गोपा)
          </div>
          <span className="text-xs text-gray-600 mt-1">बड़ोद के राजा</span>
        </div>

        <div className="hidden md:block w-px h-8 bg-orange-300 md:h-px md:w-8 self-center"></div>

        <div className="flex flex-col items-center">
          <div className="p-3 bg-orange-100 border border-orange-400 rounded shadow-sm w-48 text-center font-bold text-orange-800">
            पछाड़ सिंह जी
          </div>
          <span className="text-xs text-gray-600 mt-1">मेवाड़ आगमन</span>
        </div>
      </div>

      <div className="h-6 w-0.5 bg-orange-300 md:ml-64"></div>

      {/* Lineage under Pachad Singh Ji */}
      <div className="flex flex-col items-center md:pl-64">

        <div className="p-2 bg-[#fffaf0] border border-orange-200 rounded shadow-sm w-40 text-center text-sm text-gray-600">
          नाहर सिंह
        </div>

        <div className="h-4 w-0.5 bg-orange-300"></div>

        <div className="p-2 bg-[#fffaf0] border border-orange-200 rounded shadow-sm w-40 text-center text-sm text-gray-600">
          बिरम सिंह
        </div>

        <div className="h-4 w-0.5 bg-orange-300"></div>

        <div className="p-2 bg-[#fffaf0] border border-orange-200 rounded shadow-sm w-40 text-center text-sm text-gray-600">
          आशा सिंह
        </div>

        <div className="h-8 w-0.5 bg-orange-300"></div>

       {/* Roopsingh Ji Maharaj & Surajmal Ji */}
            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0 justify-center w-full">

            {/* Roopsingh Ji Maharaj - NOW ON LEFT */}
            <div className="relative">
              <div className="absolute -top-2 -left-2 text-amber-500 animate-pulse">
                <Crown size={20} fill="currentColor" />
              </div>

              <div className="p-3 bg-gradient-to-r from-red-800 to-red-700 text-white border-2 border-amber-400 rounded-lg shadow w-56 text-center font-bold text-base">
                श्री रूपसिंह जी महाराज
              </div>
            </div>

            {/* Small divider */}
            <div className="hidden md:block w-6 h-0.5 bg-orange-300"></div>

            {/* Surajmal Ji - NOW ON RIGHT */}
            <div className="p-3 bg-[#fff7ec] border border-orange-300 rounded-lg shadow w-48 text-center font-semibold text-orange-900">
              सूरजमल जी
              <div className="text-xs text-gray-600 mt-1">(श्री रूपसिंह जी महाराज के भ्राता)</div>
            </div>

            </div>


      </div>
    </div>
  </div>
);

export default function HistoryBook() {
  const [currentView, setCurrentView] = useState<ViewState>('cover');
  const [activeChapter, setActiveChapter] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (activeChapter < chapters.length - 1) {
      setActiveChapter(prev => prev + 1);
      scrollToTop();
    }
  };

  const handlePrev = () => {
    if (activeChapter > 0) {
      setActiveChapter(prev => prev - 1);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  if (currentView === 'cover') {
    return <CoverPage onStart={() => setCurrentView('chapters')} />;
  }

  const currentContent = chapters[activeChapter];

  return (
    <div className="h-screen bg-stone-100 font-sans text-slate-800 flex flex-col md:flex-row overflow-hidden">
      
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden bg-red-950 p-4 flex justify-between items-center shadow-lg z-50">
        <span className="font-serif text-amber-100 font-bold flex items-center gap-2">
            <Book className="w-5 h-5" />
            Royal Chronicle
        </span>
        <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-amber-100 p-2 hover:bg-red-900 rounded-full transition-colors"
        >
            {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation - Responsive */}
      <div className={`
        fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300
        ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `} onClick={() => setIsMobileMenuOpen(false)} />

      <div className={`
        fixed md:relative z-40 w-72 md:w-80 h-full bg-red-950 text-orange-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-red-900 bg-red-950 flex items-center space-x-3 shadow-lg hidden md:flex">
          <Book className="w-6 h-6 text-amber-400" />
          <h1 className="font-serif font-bold text-lg tracking-wide text-amber-100">The Royal Chronicle</h1>
        </div>
        
        {/* Main Navigation Links */}
        <div className="p-4 space-y-2 border-b border-red-900/50">
             <button
              onClick={() => { setCurrentView('cover'); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-3 rounded-lg text-amber-100 hover:bg-red-900/50 hover:text-white transition-all flex items-center space-x-3"
             >
                <Home className="w-5 h-5 text-amber-400" />
                <span className="font-bold">Home (Cover)</span>
             </button>

             <button
              onClick={() => { setCurrentView('contact'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3
                  ${currentView === 'contact' ? 'bg-red-900 border-l-4 border-amber-400 text-white' : 'text-amber-100 hover:bg-red-900/50'}`}
             >
                <Phone className="w-5 h-5 text-amber-400" />
                <span className="font-bold">Contact Info</span>
             </button>
        </div>

        {/* Chapters List */}
        <div className="px-4 py-2 text-xs font-bold text-red-300 uppercase tracking-widest mt-2">
            Chapters
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2 pt-0">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              onClick={() => { 
                  setCurrentView('chapters');
                  setActiveChapter(index); 
                  scrollToTop();
                  setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3
                ${currentView === 'chapters' && activeChapter === index 
                  ? 'bg-gradient-to-r from-red-900 to-red-800 border-l-4 border-amber-400 text-amber-50 shadow-md' 
                  : 'hover:bg-red-900/50 text-red-200 hover:text-amber-50'}`}
            >
              <span className={`${currentView === 'chapters' && activeChapter === index ? 'text-amber-400' : 'text-red-400'}`}>
                {chapter.icon}
              </span>
              <div>
                <div className="font-bold text-sm">{chapter.title}</div>
                <div className="text-xs opacity-70 font-light">{chapter.subtitle}</div>
              </div>
            </button>
          ))}
        </nav>

        <div className="p-4 bg-red-950 border-t border-red-900 text-center text-xs text-red-300">
           Based on the legend of<br/>Gaud Sodawat Rajputs
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] bg-orange-50/50 overflow-hidden">
        
        {/* Render Contact Page or Book Content */}
        {currentView === 'contact' ? (
            <ContactPage />
        ) : (
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-12 lg:p-16 scroll-smooth">
              {/* Main Book Page - Changed background to Royal Cream */}
              <div className="max-w-4xl mx-auto bg-[#fffaf0] shadow-2xl min-h-[80vh] relative mt-2 md:mt-0">
                <div className="absolute top-0 bottom-0 left-0 w-2 md:w-4 bg-gradient-to-r from-gray-200 to-white border-r border-gray-300"></div>
                
                <div className="p-6 md:p-16 pl-8 md:pl-20">
                  <div className="text-center mb-8 md:mb-12">
                    <div className="inline-block p-2 px-4 border-b-2 border-amber-400 mb-4">
                      <span className="uppercase tracking-[0.3em] text-xs font-bold text-orange-800">Chapter {currentContent.id}</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-serif font-bold text-red-950 mb-2">{currentContent.title}</h2>
                    <h3 className="text-lg md:text-xl text-orange-700 font-serif italic">{currentContent.subtitle}</h3>
                  </div>

                  <div className="flex items-center justify-center mb-10 opacity-50">
                     <div className="h-px bg-red-900 w-16 md:w-32"></div>
                     <Crown className="w-6 h-6 text-red-900 mx-4" />
                     <div className="h-px bg-red-900 w-16 md:w-32"></div>
                  </div>

                  {activeChapter === 5 && (
                     <div className="mb-10 md:float-right md:ml-8 w-full md:w-1/2 p-2 bg-[#fffaf0] border-4 border-double border-orange-300 shadow-lg transform md:rotate-1">
                        <div className="aspect-[3/4] bg-orange-50 flex items-center justify-center text-center p-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/10"></div>
                            {/* Using user provided file name */}
                            <img 
                               src="/horse.jpg" 
                               alt="Shri Roopsingh Ji Maharaj on Horse" 
                               className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"
                               onError={(e) => {
                                 (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x600?text=Roopsingh+Ji+Maharaj";
                               }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-xs">
                              श्री रूपसिंह जी महाराज (अश्वारूढ़)
                            </div>
                        </div>
                     </div>
                  )}

                  {activeChapter === 6 && (
                     <div className="mb-10 md:float-left md:mr-8 w-full md:w-1/2 p-2 bg-[#fffaf0] border-4 border-double border-orange-300 shadow-lg transform md:-rotate-1">
                        <div className="aspect-[3/4] bg-orange-50 flex items-center justify-center text-center p-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/10"></div>
                             {/* Using user provided file name */}
                            <img 
                               src="/king.jpg" 
                               alt="Shri Roopsingh Ji Maharaj Standing" 
                               className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"
                               onError={(e) => {
                                 (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x600?text=Roopsingh+Ji+Standing";
                               }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-xs">
                              श्री रूपसिंह जी महाराज (शाही स्वरूप)
                            </div>
                        </div>
                     </div>
                  )}

                  <div className="prose prose-lg prose-stone max-w-none">
                    {currentContent.content.map((paragraph, idx) => (
                      <p key={idx} className="mb-6 text-lg leading-relaxed text-gray-800 first-letter:text-5xl first-letter:font-serif first-letter:text-red-900 first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px]">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {(activeChapter === 0 || activeChapter === 5) && <LineageTree />}

                </div>
                
                <div className="absolute bottom-4 w-full text-center text-gray-400 font-serif text-sm">
                  Page {activeChapter + 1} of {chapters.length}
                </div>
              </div>

              <div className="max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row justify-between items-center px-4 pb-20 md:pb-12 gap-4">
                 <button 
                   onClick={handlePrev}
                   disabled={activeChapter === 0}
                   className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-full border-2 font-serif transition-all
                     ${activeChapter === 0 
                       ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                       : 'border-red-900 text-red-900 hover:bg-red-900 hover:text-white'}`}
                 >
                   <ChevronLeft className="w-4 h-4" />
                   <span>Previous Chapter</span>
                 </button>

                 <button 
                   onClick={handleNext}
                   disabled={activeChapter === chapters.length - 1}
                   className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-full border-2 font-serif transition-all
                     ${activeChapter === chapters.length - 1
                       ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                       : 'border-red-900 bg-red-900 text-white hover:bg-red-800 shadow-lg hover:shadow-xl'}`}
                 >
                   <span>Next Chapter</span>
                   <ChevronRight className="w-4 h-4" />
                 </button>
              </div>

            </div>
        )}
      </div>
    </div>
  );
}