var RadioManagementFrameTag = require('./radio_management_frame_tag');
function RadioProbeFrame () {
    this.tags = [];
}

RadioProbeFrame.prototype.decode = function decode(raw_packet, offset, packet_length) {
    var tag = undefined;
    //This overlaps with beacons, extract it.
    // Tags are at least 2 bytes long
    // and there is 4 bytes following
    // the list of tags. 
    while(packet_length - offset >= 6) {
        tag = new RadioManagementFrameTag().decode(raw_packet, offset);
        if (tag.typeId != undefined) {
            this.tags.push(tag);
            offset += tag.length + 2;
        }
    }
    return this;
};

module.exports = RadioProbeFrame;