var GopUI = function() {
    function t(t, e) {
        var a = this;
        this.defaults = {
            game: {
                numberOfOrbs: 3,
                reachDistance: 10,
                ticksPerAltar: 199,
                seed: 5489,
                altar: Altar.Air,
                startLocations: [new Point(2, 0)],
                presetSpawns: [],
                suppressRandomSpawns: !1
            },
            client: {
                visibilityRadius: 15,
                latency: 0,
                tickInterval: 600,
                useServer: !1,
                enablePlayerSwitching: !0,
                altarAndStartLocationForced: !1,
                allowInput: !0,
                gopControls: {
                    run: "r",
                    repeller: "q",
                    attractor: "z"
                }
            },
            callbacks: {
                setActionCallback: function(t) {},
                isGameFinished: function() {
                    return a.gameState.currentTick >= GameState.ticksPerAltar
                },
                tick: function(t, e) {}
            },
            interface: {
                showNavigationButtons: !0, plusMinusTicksAdvance: 7, margin: 12, showScore: !0, showGameCode: !0, showRestart: !0, showSave: !0, showTickTextSuffix: !0, requireLoginToSave: !1
            }
        }, this.options = this.defaults, this.$canvas = $('<canvas class="pull-left" moz-opaque>You do not have a HTML5-enabled browser. You should download the latest version of your browser.</canvas>'), this.canvas = this.$canvas[0], this.$popupMenu = $('<div class="context-menu" style="display: none"></div>'), this.$runCheckBox = $('<input type="checkbox"/>'), this.$repelCheckBox = $('<input type="checkbox"/>'), this.$restartButton = $('<button type="button" class="btn btn-warning side">Restart</button>'), this.$saveButton = $('<button type="button" class="btn btn-warning side">Save</button>'), this.$scoredTicksSpan = $('<div class="monospaced scored-ticks"/>'), this.$scoredTicksDiv = $('<div class="side-container"><header>Scored ticks</header></div>').append(this.$scoredTicksSpan), this.$gameCodeText = $('<div class="monospaced text-left"></div>'), this.$gameCodeDiv = $('<div class="side-container break-word"><header>Game code</header></div>').append(this.$gameCodeText), this.$sidebar = $('<div style="display: inline-block"/>'), this.$rootContainer = $('<div style="display: inline-block"/>'), this.lastTimestamp = 0, this.animationHandle = null, this.mousePosition = null, this.canvasFocused = !1, this.canvasContextMenuFocused = !1, this.onclick = function(t) {
            return !0
        }, this.options = $.extend(!0, {}, this.defaults, e), this.options.game.altar in AltarData || (this.options.game.altar = Altar.Air), this.gameState = new GameState(new GopBoard(53, 53, this.options.game.reachDistance), this.options.game.startLocations, this.options.game.presetSpawns, this.options.game.numberOfOrbs, this.options.game.seed, this.options.game.altar), this.gameplayData = new GameplayData(new GameStartInfo(this.options.game.seed, this.options.game.altar, this.options.game.startLocations.map(function(t) {
            return new PlayerStartInfo(t, (!0), (!1))
        }))), this.$playerControlsDiv = $('<div class="side-container"></div>').append($("<label>Run (" + this.options.client.gopControls.run + ")</label>").prepend(this.$runCheckBox), "&nbsp;", $("<label>Repel (" + this.options.client.gopControls.repeller + "/" + this.options.client.gopControls.attractor + ")</label>").prepend(this.$repelCheckBox)), this.$sidebar.append(this.$playerControlsDiv), this.options.interface.showNavigationButtons && (this.$minusTicksButton = $('<button type="button" class="btn btn-default">-' + this.options.interface.plusMinusTicksAdvance + " ticks</button>"), this.$plusTicksButton = $('<button type="button" class="btn btn-default">+' + this.options.interface.plusMinusTicksAdvance + " ticks</button>"), this.$minusPlusTicksDiv = $('<div class="side text-center"/>').append(this.$minusTicksButton, "&nbsp;", this.$plusTicksButton), this.$sidebar.append(this.$minusPlusTicksDiv)), this.options.interface.showRestart && this.$sidebar.append($("<div/>").append(this.$restartButton)), this.$sidebar.append(this.$scoredTicksDiv), this.options.interface.showGameCode && this.$sidebar.append(this.$gameCodeDiv), this.$sidebar.append($('<div class="side-container"><p>Copyright © 2017 Icy001</p></div>')), this.$rootContainer.css({
            marginTop: this.options.interface.margin,
            marginBottom: this.options.interface.margin
        }).append(this.$canvas, this.$sidebar), $(t).append(this.$rootContainer), $("body").append(this.$popupMenu), this.init()
    }
    return Object.defineProperty(t.prototype, "player", {
        get: function() {
            return this.gopCanvas.player
        },
        set: function(t) {
            this.gopCanvas.player = t
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.hidePopupMenu = function() {
        this.$popupMenu.hide(), this.canvasFocused = !0
    }, t.prototype.recalculateCanvasSize = function() {
        var t = 2 * this.options.client.visibilityRadius + 1,
            e = this.canvas.width,
            a = t * Math.min(27, Math.max(4, Math.floor(($(window).innerHeight() - this.options.interface.margin) / t)));
        return e !== a && (this.canvas.width = this.canvas.height = a), e !== a
    }, t.prototype.onMinusTicksClicked = function() {
        var t = this.gameState.currentTick - this.options.interface.plusMinusTicksAdvance;
        this.restartGame(this.gameplayData.toString(), void 0, void 0, this.player.index, !1);
        for (var e = 0; e < t; e++) this.tick(!0, !1);
        this.isGameRunning = !0, this.updateDisplay()
    }, t.prototype.onPlusTicksClicked = function() {
        for (var t = 0; t < this.options.interface.plusMinusTicksAdvance; t++) this.tick(!1, !1);
        this.updateDisplay()
    }, t.prototype.init = function() {
        var e = this;
        this.recalculateCanvasSize(), this.gopCanvas = new GopCanvas(this.canvas, this.gameState, this.options.client.visibilityRadius, 0), this.options.game.suppressRandomSpawns && (this.gameState.respawnOrbs = !1), GameState.ticksPerAltar = this.options.game.ticksPerAltar, $(window).resize(function() {
            e.recalculateCanvasSize() && (e.gopCanvas.calculateDimensions(), e.gopCanvas.paintBackground(), e.gopCanvas.paint())
        }), $(document).keydown(function(a) {
            if (e.isGameFocused()) switch (a.which) {
                case t.getKeyCodeFor(e.options.client.gopControls.repeller):
                    a.preventDefault(), e.setPlayerRunAndRepel(null, !0);
                    break;
                case t.getKeyCodeFor(e.options.client.gopControls.attractor):
                    a.preventDefault(), e.setPlayerRunAndRepel(null, !1);
                    break;
                case t.getKeyCodeFor(e.options.client.gopControls.run):
                    a.shiftKey ? (a.preventDefault(), e.$restartButton.click()) : (a.preventDefault(), e.setPlayerRunAndRepel(!e.player.run, null));
                    break;
                case 8:
                case 37:
                case 189:
                case 109:
                    a.preventDefault(), e.$minusTicksButton.click();
                    break;
                case 39:
                case 187:
                case 107:
                    a.preventDefault(), e.$plusTicksButton.click();
                    break;
                case 88:
                    e.gopCanvas.rotationAngle += Math.PI / 2, e.gopCanvas.rotationAngle %= 2 * Math.PI;
                    break;
                case 70:
                    a.shiftKey || a.ctrlKey || (a.preventDefault(), e.$rootContainer[0].scrollIntoView(!0));
                    break;
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                    if (e.options.client.enablePlayerSwitching) {
                        var i = e.gameState.players[a.which - 49];
                        void 0 !== i && (e.player = i, e.gopCanvas.paint())
                    }
            }
        }), this.$canvas.mousedown(this.onCanvasMouseDown.bind(this)).on("contextmenu", function(t) {
            return t.preventDefault()
        }).mousemove(function(a) {
            var i = 20;
            e.canvasFocused = !0;
            var n = e.$popupMenu[0];
            (a.pageX < n.offsetLeft - i || a.pageX > n.offsetLeft + n.offsetWidth + i || a.pageY < n.offsetTop - i || a.pageY > n.offsetTop + n.offsetHeight + i) && e.hidePopupMenu(), e.mousePosition = t.getMouseClickLocation(a), e.updatePointer()
        }).mouseleave(function() {
            e.canvasFocused = !1
        }), this.$runCheckBox.click(function(t) {
            e.isGameRunning && t.preventDefault(), e.setPlayerRunAndRepel(!e.player.run, null)
        }), this.$repelCheckBox.click(function(t) {
            e.isGameRunning && t.preventDefault(), e.setPlayerRunAndRepel(null, !e.player.repel)
        }), this.$minusTicksButton.click(function() {
            return e.onMinusTicksClicked()
        }), this.$plusTicksButton.click(function() {
            return e.onPlusTicksClicked()
        }), this.$restartButton.click(function() {
            e.options.client.allowInput && e.restartGame(void 0, void 0, void 0, e.player.index)
        }), this.$popupMenu.on("contextmenu", function(t) {
            return t.preventDefault()
        }).mouseenter(function() {
            e.canvasContextMenuFocused = !0
        }).mouseleave(function() {
            e.canvasContextMenuFocused = !1
        }), this.restartGame(this.options.game.code)
    }, t.prototype.restartGame = function(t, e, a, i, n) {
        var s = this;
        if (void 0 === i && (i = 0), void 0 === n && (n = !0), this.isGameRunning = !1, null != t) {
            this.gameplayData = GameplayData.parse(t);
            var o = this.gameplayData.startInfo;
            this.gameState.altar = o.altar, this.gameState.seed = o.seed, this.gameState.players = o.players.map(function(t, e) {
                var a = new Player(s.gameState, t.location, e);
                return a.run = t.run, a.repel = t.repel, a
            }), this.isGameRunning = !0
        } else null != e && (this.gameState.seed = e), a in AltarData && (this.gameState.altar = a), this.gameplayData = new GameplayData(new GameStartInfo(this.gameState.seed, this.gameState.altar, this.gameState.players.map(function(t) {
            return new PlayerStartInfo(t.location, t.run, t.repel)
        }))), this.$runCheckBox.prop("checked", this.player.run), this.$repelCheckBox.prop("checked", this.player.repel);
        this.player = this.gameState.players[i], this.options.client.altarAndStartLocationForced && (this.gameState.altar = this.options.game.altar, this.gameState.players.forEach(function(t, e) {
            t.location = s.options.game.startLocations[e]
        })), this.gameState.players.forEach(function(t) {
            t.action = GameAction.idle(), t.freeze()
        }), Utils.loadAltar(this.gameState.altar).fail(function() {
            s.gameState.altar = Altar.None
        }).always(function() {
            s.gameState.reset(), n && (s.gopCanvas.paintBackground(), s.gopCanvas.paint(), s.updateDisplay()), s.$saveButton.prop("disabled", !0)
        })
    }, t.prototype.onCanvasMouseDown = function(e) {
        var a, i = this,
            n = function(t) {
                return function(e) {
                    0 === e.button && (i.setPlayerAction(GameAction.attract(t, !1, !1, !0)), i.hidePopupMenu()), e.preventDefault()
                }
            },
            s = t.getMouseClickLocation(e),
            o = this.gopCanvas.fromScreenCoords(s.x, s.y, !1),
            r = this.gopCanvas.fromScreenCoords(s.x, s.y, !0);
        if (0 === e.button) {
            if (this.hidePopupMenu(), !this.onclick(r)) return;
            var c = !1;
            for (a = 0; a < this.gameState.orbs.length; ++a)
                if (this.isMouseOverOrb(o, this.gopCanvas.getDrawLocation(this.gameState.orbs[a]))) {
                    this.setPlayerAction(GameAction.attract(a, !1, !1, !0)), c = !0;
                    break
                }
            c || (r.equals(this.player.location) || GopBoard.isInAltar(r) && GopBoard.isPlayerAdjacentToAltar(this.player.location) ? this.setPlayerAction(GameAction.idle()) : GopBoard.isInAltar(r) ? this.setPlayerAction(GameAction.move(this.gameState.board.nearestAltarPoint(this.player.location, PathMode.Player))) : this.setPlayerAction(GameAction.move(r)))
        } else if (2 === e.button) {
            for (this.$popupMenu.find("a").remove(), a = 0; a < this.gameState.orbs.length; ++a)
                if (this.isMouseOverOrb(o, this.gopCanvas.getDrawLocation(this.gameState.orbs[a]))) {
                    var p = $("<a class='context-menu-item'></a>").html((this.player.repel ? "Repel" : "Attract") + " <span style='color: yellow;'>Orb " + GameAction.orbIndexToChar(a) + "</span>").mousedown(n(a)).on("contextmenu", function(t) {
                        return t.preventDefault()
                    });
                    this.$popupMenu.append(p)
                }
            var l = $("<a class='context-menu-item'>Walk to " + r + "</a>").mousedown(function(t) {
                if (0 === t.button) {
                    if (i.hidePopupMenu(), !i.onclick(r)) return;
                    i.setPlayerAction(GameAction.move(r))
                }
                t.preventDefault()
            }).on("contextmenu", function(t) {
                return t.preventDefault()
            });
            this.$popupMenu.append(l).css({
                position: "absolute",
                left: e.pageX - 25,
                top: e.pageY + 1
            }).show()
        }
    }, t.prototype.setPlayerAction = function(t) {
        var e = this;
        if (this.options.client.allowInput) {
            if (!this.options.client.useServer) {
                var a = function() {
                    t.toggleRun = e.player.action.toggleRun, t.changeWand = e.player.action.changeWand, e.player.action = t, e.gameplayData.actions.sliceForPlayer(e.player.index, e.gameState.currentTick)
                };
                this.options.client.latency > 0 ? setTimeout(a, this.options.client.latency) : a()
            }
            this.options.callbacks.setActionCallback(t), this.isGameRunning || this.options.callbacks.isGameFinished() || (this.isGameRunning = !0, this.tick())
        }
    }, t.prototype.setPlayerRunAndRepel = function(t, e) {
        var a = this;
        if (this.options.client.allowInput)
            if (this.isGameRunning || 0 !== this.gameState.currentTick) {
                var i = function() {
                    void 0 !== t && null !== t && (a.player.action.toggleRun = a.player.run !== t), void 0 !== e && null !== e && (a.player.action.changeWand = a.player.repel !== e), a.gameplayData.actions.sliceForPlayer(a.player.index, a.gameState.currentTick)
                };
                this.options.client.latency > 0 ? setTimeout(i, this.options.client.latency) : i()
            } else {
                var n = this.gameplayData.startInfo.players[this.player.index];
                void 0 !== t && null !== t && (n.run = this.player.run = t), void 0 !== e && null !== e && (n.repel = this.player.repel = e), this.updateDisplay()
            }
    }, t.prototype.updateDisplay = function() {
        this.$runCheckBox.prop("checked", this.player.run), this.$repelCheckBox.prop("checked", this.player.repel), this.$scoredTicksSpan.html("<span>" + this.gameState.scoredTicks.join("</span>&nbsp;<span>") + "</span>"), this.$gameCodeText.text(this.gameplayData.toString())
    }, t.prototype.tick = function(t, e) {
        var a = this;
        void 0 === t && (t = !1), void 0 === e && (e = !0), (t || this.isGameRunning) && (this.gameState.players.forEach(function(t, e) {
            var i = a.gameplayData.actions.getForPlayer(e);
            i.length > a.gameState.currentTick ? t.action = i[a.gameState.currentTick] : a.gameplayData.actions.pushForPlayer(e, t.action.copy())
        }), this.gameState.step(), this.gameState.players.forEach(function(t) {
            t.action = t.action.copy(!0)
        }), this.options.callbacks.isGameFinished() && (this.isGameRunning = !1), e && this.updateDisplay(), this.options.callbacks.tick(t, e))
    }, t.prototype.updatePointer = function() {
        this.mousePosition && this.$canvas.css("cursor", this.isMouseOverAnyOrb(this.gopCanvas.fromScreenCoords(this.mousePosition.x, this.mousePosition.y, !1)) ? "pointer" : "default")
    }, t.prototype.isMouseOverOrb = function(t, e) {
        var a = t.subtract(e);
        return Math.abs(a.x) < .5 * this.gopCanvas.orbSize && Math.abs(a.y) < .5 * this.gopCanvas.orbSize
    }, t.prototype.isMouseOverAnyOrb = function(t) {
        var e = this;
        return this.gameState.orbs.some(function(a) {
            return e.isMouseOverOrb(t, e.gopCanvas.getDrawLocation(a))
        })
    }, Object.defineProperty(t.prototype, "isGameRunning", {
        get: function() {
            return null !== this.animationHandle
        },
        set: function(t) {
            this.gopCanvas.isRunning = t, this.isGameRunning !== t && (t ? (this.lastTimestamp = performance.now(), this.animationHandle = requestAnimationFrame(this.paint.bind(this))) : (cancelAnimationFrame(this.animationHandle), this.animationHandle = null, this.gopCanvas.tickProgress = 0, this.gopCanvas.paint()))
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isGameFocused = function() {
        return this.canvasFocused || this.canvasContextMenuFocused
    }, t.prototype.paint = function(t) {
        this.isGameRunning ? (this.gopCanvas.tickProgress += (t - this.lastTimestamp) / this.options.client.tickInterval, this.gopCanvas.tickProgress >= 1 && (this.tick(), this.gopCanvas.tickProgress -= Math.floor(this.gopCanvas.tickProgress))) : this.gopCanvas.tickProgress = 0, this.gopCanvas.paint(), this.animationHandle = requestAnimationFrame(this.paint.bind(this)), this.updatePointer(), this.lastTimestamp = t, this.options.callbacks.isGameFinished() && (this.isGameRunning = !1)
    }, t.getMouseClickLocation = function(t) {
        var e = t.offsetX || t.pageX - $(t.target).offset().left,
            a = t.offsetY || t.pageY - $(t.target).offset().top;
        return new Point(e, a)
    }, t.getKeyCodeFor = function(e) {
        return null == e ? 0 : e in t.keyCodes ? t.keyCodes[e] : e.toUpperCase().charCodeAt(0)
    }, t
}();
GopUI.keyCodes = {
    "/": 191,
    N0: 96,
    N1: 97
};