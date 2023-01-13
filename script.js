	/*
	 Options:
		Account Check:
			Loads account pages of Debank and Etherscan
		Anonymity Check:
			Loads account score on Tutela
		Transaction Info:
			Loads transaction info on Phalcon and Tenderly
		Token Check:
			Loads token information on Token Sniffer, Breadcrumbs and Bubblemap
	*/

var Addressmenu = {
    "id": "Address",
    "title": "Address Check",
    "contexts": ['selection']
};
var Token = {
    "id": "Token check",
    "title": "Token Check",
    "contexts": ['selection']
};
var Transaction = {
	// "parentId": "Address",
    "id": "Transaction info",
    "title": "Transaction Check",
    "contexts": ['selection']
};
var Account = {
	"parentId": "Address",
    "id": "Account check",
    "title": "Account Check",
    "contexts": ['selection']
};
var Anonymity = {
	"parentId": "Address",
    "id": "Anonymity check",
    "title": "Anonymity check",
    "contexts": ['selection']
};



chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create(Addressmenu)
	chrome.contextMenus.create(Token)
	chrome.contextMenus.create(Transaction)
	chrome.contextMenus.create(Account)
    chrome.contextMenus.create(Anonymity)
});

function fixedEncodeURI (str) {
    return encodeURI(str).replace('/%5B/g', '[').replace('/%5D/g', ']');
}

chrome.contextMenus.onClicked.addListener(function(contextClick) {
	
	if (contextClick.selectionText && contextClick.menuItemId == "Account check") {
		var DeBank = "https://debank.com/profile/" + fixedEncodeURI(contextClick.selectionText);
		var Etherscan = "https://etherscan.io/address/" + fixedEncodeURI(contextClick.selectionText);
		chrome.tabs.create({url:DeBank});
		chrome.tabs.create({url:Etherscan}); 
    }
	else if (contextClick.selectionText && contextClick.menuItemId == "Anonymity check") {
		var Tutela = "https://tutela.xyz/cluster?address=" + fixedEncodeURI(contextClick.selectionText);
		chrome.tabs.create({url:Tutela});
    }
	else if (contextClick.selectionText && contextClick.menuItemId == "Transaction info") {
        var Phalcon = "https://phalcon.blocksec.com/tx/eth/" + fixedEncodeURI(contextClick.selectionText);
		var Tenderly = "https://dashboard.tenderly.co/tx/mainnet/" + fixedEncodeURI(contextClick.selectionText);
        chrome.tabs.create({url:Tenderly});
        chrome.tabs.create({url:Phalcon});
    }
	else if (contextClick.selectionText && contextClick.menuItemId == "Token check") {
        var BreadCrumbs = "https://www.breadcrumbs.app/reports/" + fixedEncodeURI(contextClick.selectionText);
		var BubbleMap = "https://app.bubblemaps.io/eth/token/" + fixedEncodeURI(contextClick.selectionText);
        var Sniffer = "https://tokensniffer.com/token/eth/" + fixedEncodeURI(contextClick.selectionText);
        chrome.tabs.create({url:Sniffer});
        chrome.tabs.create({url:BreadCrumbs});
		chrome.tabs.create({url:BubbleMap});
    }
	
});