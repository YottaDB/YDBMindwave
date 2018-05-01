var resetMindWaveData = function() {
  eegData = {
    names: ["hiAlpha", "loAlpha", "hiBeta", "loBeta", "midGamma", "loGamma", "theta", "delta"],
    displayNames: ["hiAlpha", "loAlpha", "hiBeta", "loBeta", "midGamma", "loGamma", "theta", "delta"],
    colors: ["green", "orange", "red", "darkred", "#000000", "#ff00ff", "#2863bc", "#c8801c"],
    axis: ["left", "left", "left", "left", "left", "left", "left", "right"],
    times: [],
    values: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ]
  };
  alphaData = {
    names: ["hiAlpha", "loAlpha"],
    displayNames: ["hiAlpha", "loAlpha"],
    colors: ["green", "orange"],
    times: [],
    values: [
      [],
      []
    ]
  };
  betaData = {
    names: ["hiBeta", "loBeta"],
    displayNames: ["hiBeta", "loBeta"],
    colors: ["red", "darkred"],
    times: [],
    values: [
      [],
      []
    ]
  };
  gammaData = {
    names: ["midGamma", "loGamma"],
    displayNames: ["midGamma", "loGamma"],
    colors: ["#000000", "#ff00ff"],
    times: [],
    values: [
      [],
      []
    ]
  };
  thetaData = {
    names: ["theta"],
    displayNames: ["theta"],
    colors: ["#2863bc"],
    times: [],
    values: [
      []
    ]
  };
  deltaData = {
    names: ["delta"],
    displayNames: ["delta"],
    colors: ["#c8801c"],
    times: [],
    values: [
      []
    ]
  };
  attentionData = {
    names: ["attention"],
    displayNames: ["attention"],
    colors: ["green", "orange"],
    times: [],
    values: [
      []
    ]
  };
  meditationData = {
    names: ["meditation"],
    displayNames: ["meditation"],
    colors: ["green", "orange"],
    times: [],
    values: [
      []
    ]
  };
  attentionMeditationData = {
    names: ["attention", "meditation"],
    displayNames: ["attention", "meditation"],
    colors: ["#2863bc", "#c8801c"],
    times: [],
    values: [
      [],
      []
    ]
  };
};

var parseMindWaveData = function(mwData) {
  _.each(mwData, function(item, date) {
    var attention, meditation, delta, hiAlpha, loAlpha, hiBeta, loBeta, midGamma, loGamma, delta, theta, epochDate;
    if (date === "metadata") {
      totalItems = item.TotalItems;
      return;
    }
    _.each(item, function(rawData, type) {
      switch (type) {
        case "attention":
          attention = rawData;
          if (date.length === 21) {
            epochDate = moment(date.substring(0, 18) + "Z", "YYYYMMDDHHmmss.SSSZ").valueOf();
          } else {
            epochDate = parseInt(date);
          }
          break;
        case "meditation":
          meditation = rawData;
          if (date.length === 21) {
            epochDate = moment(date.substring(0, 18) + "Z", "YYYYMMDDHHmmss.SSSZ").valueOf();
          } else {
            epochDate = parseInt(date);
          }
          break;
        case "delta":
          delta = rawData;
          if (date.length === 21) {
            epochDate = moment(date.substring(0, 18) + "Z", "YYYYMMDDHHmmss.SSSZ").valueOf();
          } else {
            epochDate = parseInt(date);
          }
          break;
        case "hiAlpha":
          hiAlpha = rawData;
          if (date.length === 21) {
            epochDate = moment(date.substring(0, 18) + "Z", "YYYYMMDDHHmmss.SSSZ").valueOf();
          } else {
            epochDate = parseInt(date);
          }
          break;
        case "hiBeta":
          hiBeta = rawData;
          if (date.length === 21) {
            epochDate = moment(date.substring(0, 18) + "Z", "YYYYMMDDHHmmss.SSSZ").valueOf();
          } else {
            epochDate = parseInt(date);
          }
          break;
        case "midGamma":
          midGamma = rawData;
          if (date.length === 21) {
            epochDate = moment(date.substring(0, 18) + "Z", "YYYYMMDDHHmmss.SSSZ").valueOf();
          } else {
            epochDate = parseInt(date);
          }
          break;
        case "loAlpha":
          loAlpha = rawData;
          if (date.length === 21) {
            epochDate = moment(date.substring(0, 18) + "Z", "YYYYMMDDHHmmss.SSSZ").valueOf();
          } else {
            epochDate = parseInt(date);
          }
          break;
        case "loBeta":
          loBeta = rawData;
          if (date.length === 21) {
            epochDate = moment(date.substring(0, 18) + "Z", "YYYYMMDDHHmmss.SSSZ").valueOf();
          } else {
            epochDate = parseInt(date);
          }
          break;
        case "loGamma":
          loGamma = rawData;
          if (date.length === 21) {
            epochDate = moment(date.substring(0, 18) + "Z", "YYYYMMDDHHmmss.SSSZ").valueOf();
          } else {
            epochDate = parseInt(date);
          }
          break;
        case "theta":
          theta = rawData;
          if (date.length === 21) {
            epochDate = moment(date.substring(0, 18) + "Z", "YYYYMMDDHHmmss.SSSZ").valueOf();
          } else {
            epochDate = parseInt(date);
          }
          break;
      }
    });
    if (attention) {
      attentionData.values[0].push({
        date: epochDate,
        value: attention
      });
      attentionMeditationData.values[0].push({
        date: epochDate,
        value: attention
      });
    }
    if (meditation) {
      meditationData.values[0].push({
        date: epochDate,
        value: meditation
      });
      attentionMeditationData.values[1].push({
        date: epochDate,
        value: meditation
      });
    }
    if (delta) {
      deltaData.values[0].push({
        date: epochDate,
        value: delta
      });
    }
    if (theta) {
      thetaData.values[0].push({
        date: epochDate,
        value: theta
      });
    }
    if (midGamma && loGamma) {
      gammaData.values[0].push({
        date: epochDate,
        value: midGamma
      });
      gammaData.values[1].push({
        date: epochDate,
        value: loGamma
      });
    }
    if (hiBeta && loBeta) {
      betaData.values[0].push({
        date: epochDate,
        value: hiBeta
      });
      betaData.values[1].push({
        date: epochDate,
        value: loBeta
      });
    }
    if (hiAlpha && loAlpha) {
      alphaData.values[0].push({
        date: epochDate,
        value: hiAlpha
      });
      alphaData.values[1].push({
        date: epochDate,
        value: loAlpha
      });
    }
    if (midGamma && loGamma && hiBeta && loBeta && hiAlpha && loAlpha && delta && theta) {
      eegData.values[0].push({
        date: epochDate,
        value: hiAlpha
      });
      eegData.values[1].push({
        date: epochDate,
        value: loAlpha
      });
      eegData.values[2].push({
        date: epochDate,
        value: hiBeta
      });
      eegData.values[3].push({
        date: epochDate,
        value: loBeta
      });
      eegData.values[4].push({
        date: epochDate,
        value: midGamma
      });
      eegData.values[5].push({
        date: epochDate,
        value: loGamma
      });
      eegData.values[6].push({
        date: epochDate,
        value: theta
      });
      eegData.values[7].push({
        date: epochDate,
        value: delta
      });
    }
  });
};