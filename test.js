
var http = require('http');
var IncomingMessage = http.IncomingMessage;

var req = new IncomingMessage;
req.headers['accept-encoding'] = 'deflate,gzip,foo,bar,baz';

describe('best-encoding', function () {
  var best;

  // hacky shit:
  //   dont cache the module, so we can alter defaults
  beforeEach(function () {
    delete require.cache[require.resolve('./')];
    best = require('./');
  });

  describe('best-encoding(req)', function () {
    it('should default to gzip and deflate', function () {
      best.encodings.should.be.eql(['gzip', 'deflate']);
    });

    it('should prefer gzip to deflate', function () {
      best(req).should.be.equal('gzip');
    });

    it('should allow you to set default encodings', function () {
      best.encodings = [ 'apples', 'oranges', 'baz' ];
      best(req).should.be.equal('baz');
    });
  });

  describe('best-encoding(req, encodings)', function () {
    it('should allow you to pass encodings', function () {
      best(req, [ 'foo', 'bar' ]).should.be.equal('foo');
    });

    it('should favor encodings based on order', function () {
      best(req, [ 'bar', 'baz', 'foo' ]).should.be.equal('bar');
    });
  });

});
