var nfq = require('../nfqueue');
var pcap = require('pcap');

var counter = 0;


nfq.createQueueHandler(1, function(nfpacket) {
  console.log("packet received");
  //console.log(JSON.stringify(nfpack, null, 2));

  var packet = pcap.decode.ip(nfpacket.payload, 0);
  console.log(" ip src=" + packet.saddr);
  console.log(" ip dst=" + packet.daddr);
  console.log(" ip proto=" + packet.protocol_name);

  nfpacket.setVerdict((counter++ % 2) ? nfq.NF_DROP : nfq.NF_ACCEPT);
});
