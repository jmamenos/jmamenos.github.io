WebFontConfig = {
    google: { families: [ 'Open+Sans::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

var AttractDot = function() {
        function t(t, e, i) {
            this.startObject = t, this.endObject = e, this.mesh = new THREE.Mesh(new THREE.SphereGeometry(.12, 8, 8), new THREE.MeshLambertMaterial({
                color: i,
                transparent: !0,
                opacity: .75
            })), this.mesh.position.copy(t.position), this.mesh.castShadow = !0
        }
        return t.prototype.update = function(t) {
            this.mesh.position.copy(this.endObject.position.clone().lerp(this.startObject.position, Math.min(1, t)))
        }, t
    }(),
    ClickIndicator = function() {
        function t() {
            this.domElement = document.createElement("canvas"), this.isActive = !1, this.progress = 0, this.currentTile = 0, this.domElement.style.position = "absolute", this.domElement.style.pointerEvents = "none", this.domElement.hidden = !0, this.context = this.domElement.getContext("2d")
        }
        return t.prototype.start = function(t, e, i, a, s) {
            this.image = t, this.numTiles = a, this.tileDuration = s, this.domElement.width = t.width / a, this.domElement.height = t.height, this.domElement.style.left = e - this.domElement.width / 2 + "px", this.domElement.style.top = i - this.domElement.height / 2 + "px", this.domElement.hidden = !1, this.isActive = !0, this.progress = 0, this.currentTile = 0, this.drawCurrentTile()
        }, t.prototype.end = function() {
            this.isActive = !1, this.domElement.hidden = !0
        }, t.prototype.update = function(t) {
            if (this.isActive) {
                this.progress += t;
                var e = Math.floor(this.progress / this.tileDuration);
                this.currentTile !== e && (this.currentTile = e, this.currentTile < this.numTiles ? this.drawCurrentTile() : this.end())
            }
        }, t.prototype.drawCurrentTile = function() {
            this.context.clearRect(0, 0, this.domElement.width, this.domElement.height), this.context.drawImage(this.image, -this.currentTile * this.domElement.width, 0)
        }, t
    }(),
    __extends = this && this.__extends || function(t, e) {
        function i() {
            this.constructor = t
        }
        for (var a in e) e.hasOwnProperty(a) && (t[a] = e[a]);
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    },
    FollowCamera = function(t) {
        function e(e, i, a, s, r) {
            var n = t.call(this, e, i, a, s) || this;
            return n.followTarget = r, n.oldTargetPosition = new THREE.Vector3, n.easeTargetPosition = new THREE.Vector3, n.easeFactor = .05, n.maxZoom = 200, n.updateTargetPosition(), n
        }
        return __extends(e, t), e.prototype.updateTargetPosition = function() {
            void 0 !== this.followTarget && (this.easeTargetPosition.copy(this.followTarget.position), this.oldTargetPosition.copy(this.followTarget.position))
        }, e.prototype.rotateAroundTarget = function(t, e) {
            if (this.followTarget) {
                var i = this.position.clone().sub(this.easeTargetPosition),
                    a = i.length(),
                    s = new THREE.Vector2(i.x, i.y).length();
                this.translateY(Math.max(-i.z, Math.min(s - .1 * a, a * e))), this.translateX(t * s), this.lookAt(this.easeTargetPosition), this.translateZ(a - this.position.distanceTo(this.easeTargetPosition))
            }
        }, e.prototype.zoomTowardTarget = function(t) {
            if (null != this.followTarget) {
                var e = this.position.distanceTo(this.easeTargetPosition);
                this.translateZ(Math.min(this.maxZoom - e, e * t))
            }
        }, e.prototype.update = function(t) {
            null != this.followTarget && (this.easeTargetPosition.lerp(this.followTarget.position, this.easeFactor), this.position.x += this.easeTargetPosition.x - this.oldTargetPosition.x, this.position.y += this.easeTargetPosition.y - this.oldTargetPosition.y, this.oldTargetPosition.copy(this.easeTargetPosition.clone()), this.lookAt(this.easeTargetPosition))
        }, e
    }(THREE.PerspectiveCamera),
    Game = function() {
        function t(t, e) {
            this.isStarted = !1, this.isPaused = !1, this.gameState = t, this.playerIndex = e, this.resetGameplayData()
        }
        return Object.defineProperty(t.prototype, "player", {
            get: function() {
                return this.playerIndex in this.gameState.players ? this.gameState.players[this.playerIndex] : null
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "isFinished", {
            get: function() {
                return this.gameState.isFinished
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "isCustom", {
            get: function() {
                return this.gameState.presetSpawns.length > 0 || this.gameState.board.reachDistance !== GopBoard.defaults.reachDistance || GameState.ticksPerAltar !== GameState.defaults.ticksPerAltar
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.resetGameplayData = function() {
            this.gameplayData = new GameplayData(new GameStartInfo(this.gameState.seed, this.gameState.altar, this.gameState.players.map(function(t) {
                return new PlayerStartInfo(t.location, t.run, t.repel)
            })))
        }, t.prototype.start = function() {
            this.isStarted = !0
        }, t.prototype.pause = function() {
            this.isPaused = !0
        }, t.prototype.resume = function() {
            this.isPaused = !1
        }, t.prototype.restart = function(t) {
            if (void 0 === t && (t = !0), this.isStarted = !1, this.gameState.reset(), t) this.resetGameplayData();
            else
                for (var e = 0, i = this.gameState.players; e < i.length; e++) {
                    var a = i[e],
                        s = this.gameplayData.startInfo.players[a.index];
                    a.location = s.location, a.run = s.run, a.repel = s.repel
                }
        }, t.prototype.restartFromCode = function(t) {
            var e = this;
            this.gameplayData = GameplayData.parse(t);
            var i = this.gameplayData.startInfo;
            return this.gameState.altar = i.altar, this.gameState.seed = i.seed, this.gameState.players = i.players.map(function(t, i) {
                var a = new Player(e.gameState, t.location, i);
                return a.run = t.run, a.repel = t.repel, a
            }), Utils.loadAltar(this.gameState.altar).fail(function() {
                e.gameState.altar = Altar.None
            }).always(function() {
                e.restart(!1), e.start()
            })
        }, t.prototype.tick = function() {
            if (this.isStarted && !this.isFinished) {
                for (var t = 0, e = this.gameState.players; t < e.length; t++) {
                    var i = e[t],
                        a = this.gameplayData.actions.getForPlayer(i.index);
                    a.length > this.gameState.currentTick ? i.action = a[this.gameState.currentTick] : this.gameplayData.actions.pushForPlayer(i.index, i.action.copy())
                }
                this.gameState.step();
                for (var s = 0, r = this.gameState.players; s < r.length; s++) {
                    var i = r[s];
                    i.action = i.action.copy(!0)
                }
            }
        }, t.prototype.setMyAction = function(t) {
            t.toggleRun = this.player.action.toggleRun, t.changeWand = this.player.action.changeWand, this.player.action = t, this.isStarted || this.start(), this.gameplayData.actions.sliceForPlayer(this.playerIndex, this.gameState.currentTick)
        }, t.prototype.setRunAndRepel = function(t, e, i, a) {
            void 0 === a && (a = !1);
            var s = this.gameState.players[t];
            if (this.isStarted) null != e && (s.action.toggleRun = s.run !== e), null != i && (s.action.changeWand = s.repel !== i), a && this.gameplayData.actions.sliceForPlayer(t, this.gameState.currentTick);
            else {
                var r = this.gameplayData.startInfo.players[t];
                null != e && (s.run = r.run = e), null != i && (s.repel = r.repel = i)
            }
        }, t.prototype.setMyRunAndRepel = function(t, e) {
            this.setRunAndRepel(this.playerIndex, t, e, !0)
        }, t
    }(),
    GopUI3D = function() {
        function t(t, e, i) {
            this.container = t, this.playerColors = ["#08f", "#871450", "#148718", "#630D0D"], this.orbColor = "#dddd00", this.barrierColor = "#666666", this.rockColor = "#888888", this.orbSize = .65, this.orbOpacity = .75, this.useOrbLights = !1, this.barrierHeight = 1.5, this.rockHeight = .4, this.waterHeight = .06, this.playerHeight = 1.5, this.tickLength = 500, this.allowConfigureTickLength = !0, this.cameraRotateXSpeed = .8 * Math.PI, this.cameraRotateYSpeed = .5 * Math.PI, this.mouseRotateSensitivity = .006, this.zoomSpeed = 10, this.mouseWheelZoomFactor = 2e-4, this.timerRadius = 40, this.orbVisibilityRadius = 15, this.allowPlayerSwitching = !0, this.autoTick = !0, this.keybinds = {
                run: "r",
                repel: "q",
                attract: "z",
                rewind: "-",
                fastForward: "="
            }, this.renderer = new THREE.WebGLRenderer({
                antialias: Utils.getQueryAsBoolean("antialias")
            }), this.camera = new FollowCamera(60, 1, .1, 2e4), this.scene = new THREE.Scene, this.textureLoader = new THREE.TextureLoader, this.raycaster = new THREE.Raycaster, this.clickIndicator = new ClickIndicator, this.playerObjects = [], this.orbObjects = [], this.light = new THREE.DirectionalLight(16777164, .9), this.altarLight = new THREE.PointLight(16777215, 1.5, 15, 2), this.ambientLight = new THREE.AmbientLight(13421823, .7), this.altarObjects = new THREE.Group, this.attractDots = [], this.tickProgress = 1, this.upPressed = !1, this.downPressed = !1, this.leftPressed = !1, this.rightPressed = !1, this.zoomInPressed = !1, this.zoomOutPressed = !1, this.middleMouseClicked = !1, this.clock = new THREE.Clock, this.isInitialized = !1, this.game = new Game(e, i), this.infoBox = new InfoBox(this, (!0))
        }
        return Object.defineProperty(t.prototype, "gameState", {
            get: function() {
                return this.game.gameState
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "size", {
            get: function() {
                return this.gameState.board.numRows
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "radius", {
            get: function() {
                return Math.floor(this.gameState.board.numRows / 2)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "orbHeight", {
            get: function() {
                return this.orbSize + .15
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "playerIndex", {
            get: function() {
                return this.game.playerIndex
            },
            set: function(t) {
                this.playerIndex !== t && (this.game.playerIndex = t, t < this.playerObjects.length && (this.camera.followTarget = this.playerObjects[t].mesh))
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "width", {
            get: function() {
                return this.renderer.domElement.width
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "height", {
            get: function() {
                return this.renderer.domElement.height
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "useShadows", {
            get: function() {
                return this.renderer.shadowMap.enabled
            },
            set: function(t) {
                this.renderer.shadowMap.enabled !== t && (this.renderer.shadowMap.enabled = t, this.initAltarGraphics())
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "isPaused", {
            get: function() {
                return this.game.isPaused
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "clickIndicatorDuration", {
            get: function() {
                return .4
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.init = function() {
            this.renderer.shadowMap.enabled = !0, this.renderer.setPixelRatio(devicePixelRatio), this.renderer.domElement.tabIndex = 1, this.renderer.domElement.style.outline = "none", this.container.appendChild(this.renderer.domElement), this.camera.up.set(0, 0, 1), this.camera.position.set(0, -9, 14), this.light.position.set(-6, -12, 20), this.light.castShadow = !0;
            var t = 21;
            return this.light.shadow.radius = .5, this.light.shadow.camera.left = -t, this.light.shadow.camera.right = t, this.light.shadow.camera.top = t, this.light.shadow.camera.bottom = -t, this.light.shadow.camera.near = 5, this.light.shadow.camera.far = 50, this.light.shadow.mapSize.x = 2048, this.light.shadow.mapSize.y = 2048, this.altarLight.position.set(0, 0, 1.5), this.scene.add(this.ambientLight), this.scene.add(this.light), this.initTextures(), this.initSkybox(), this.initAltarGraphics(), this.initPlayerGraphics(), this.initOrbGraphics(), this.initHud(), this.initControls(), this.infoBox.init(), this.contextMenu = document.createElement("div"), this.contextMenu.hidden = !0, this.contextMenu.style.position = "absolute", this.contextMenu.addEventListener("contextmenu", function(t) {
                t.preventDefault()
            }), this.contextMenu.addEventListener("mousedown", function(t) {
                t.preventDefault()
            }), this.container.appendChild(this.contextMenu), this.optionsMenu = new OptionsMenu(this), this.optionsMenu.init(), this.optionsMenu.initOptionsFromLocalStorage(), this.onWindowResize(), this.isInitialized = !0, this
        }, t.prototype.initTextures = function() {
            var t = this;
            this.gridTexture = this.textureLoader.load("images/textures/grid.png"), this.gridTexture.wrapS = THREE.RepeatWrapping, this.gridTexture.wrapT = THREE.RepeatWrapping, this.gridTexture.repeat.set(this.size, this.size), this.gridTexture.anisotropy = this.renderer.getMaxAnisotropy(), this.marbleTexture = this.textureLoader.load("images/textures/marble.jpg"), this.marbleTexture.anisotropy = this.renderer.getMaxAnisotropy(), this.waterTexture = this.textureLoader.load("images/textures/water2.jpg"), this.waterTexture.anisotropy = this.renderer.getMaxAnisotropy();
            var e = "images/textures/skyboxes/sea2/sea_",
                i = ["rt", "lf", "up", "dn", "ft", "bk"];
            this.skyboxTextures = i.map(function(i) {
                return t.textureLoader.load(e + i + ".png")
            });
            var a = ["images/click-indicators/yellow-x.png", "images/click-indicators/red-x.png"];
            this.clickIndicatorImages = a.map(function(t) {
                var e = new Image;
                return e.src = t, e
            })
        }, t.prototype.initSkybox = function() {
            var t = this.skyboxTextures.map(function(t) {
                return new THREE.MeshBasicMaterial({
                    map: t,
                    side: THREE.BackSide,
                    fog: !1
                })
            });
            this.skybox = new THREE.Mesh(new THREE.CubeGeometry(1e4, 1e4, 1e4), new THREE.MultiMaterial(t)), this.skybox.rotation.x = Math.PI / 2, this.scene.add(this.skybox)
        }, t.prototype.initAltarGraphics = function() {
            this.displayedAltar = this.gameState.altar;
            var e = [this.barrierColor, this.rockColor, this.getWaterColor(), 10066329],
                i = .08,
                a = AltarData[this.gameState.altar].groundColor;
            a instanceof Array ? a = "#ffffff" : null == a && (a = "#545566"), void 0 !== this.altarObjects && this.scene.remove(this.altarObjects), this.altarObjects = new THREE.Group, this.ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(this.size, this.size), new THREE.MeshPhongMaterial({
                color: a,
                map: this.generateGroundTexture()
            })), this.ground.receiveShadow = !0, this.ground.matrixAutoUpdate = !1, this.altarObjects.add(this.ground);
            for (var s = [], r = 0; r <= e.length; r++) s.push(new THREE.Geometry);
            var n = new THREE.BoxGeometry(1, 1, this.barrierHeight);
            n.faces.splice(10, 2);
            var o = new THREE.BoxGeometry(1, 1, this.rockHeight);
            o.faces.splice(10, 2);
            var h = new THREE.PlaneGeometry(1, 1),
                l = new THREE.BoxGeometry(i, 1, this.barrierHeight);
            l.faces.splice(10, 2);
            var c = new THREE.BoxGeometry(1, i, this.barrierHeight);
            c.faces.splice(10, 2);
            var d = new THREE.BoxGeometry(i, i, this.barrierHeight);
            d.faces.splice(10, 2);
            for (var p = -this.radius; p <= this.radius; p++)
                for (var u = -this.radius; u <= this.radius; u++) {
                    var m = this.gameState.board.get(new Point(u, p)),
                        g = void 0;
                    m === Tile.Barrier ? (g = new THREE.Mesh(n), g.position.set(u, p, this.barrierHeight / 2), s[0].mergeMesh(g)) : m === Tile.Rock ? (g = new THREE.Mesh(o), g.position.set(u, p, this.rockHeight / 2), s[1].mergeMesh(g)) : m === Tile.Water && (g = new THREE.Mesh(h), g.position.set(u, p, t.waterZOffset), s[2].mergeMesh(g)), m !== Tile.WallW && m !== Tile.WallSW || (g = new THREE.Mesh(l), g.position.set(u - .5, p, this.barrierHeight / 2), s[3].mergeMesh(g)), m !== Tile.WallS && m !== Tile.WallSW || (g = new THREE.Mesh(c), g.position.set(u, p - .5, this.barrierHeight / 2), s[3].mergeMesh(g)), m !== Tile.Minipillar1 && m !== Tile.Minipillar2 || (g = new THREE.Mesh(d), g.position.set(u - .5, p - .5, this.barrierHeight / 2), s[3].mergeMesh(g))
                }
            for (var r = 0; r < s.length; r++)
                if (s[r].vertices.length > 0) {
                    s[r].mergeVertices();
                    var g = new THREE.Mesh(s[r], new THREE.MeshLambertMaterial({
                        color: e[r]
                    }));
                    if (g.matrixAutoUpdate = !1, g.castShadow = !0, 2 === r) {
                        var f = this.getWaterAlpha();
                        g.material.transparent = f < 1, g.material.opacity = f, g.castShadow = !1, g.material.map = this.waterTexture, g.material.needsUpdate = !0
                    } else g.material.map = this.marbleTexture, g.material.needsUpdate = !0;
                    this.altarObjects.add(g)
                }
            this.scene.add(this.altarObjects)
        }, t.prototype.initPlayerGraphics = function() {
            for (var t = this, e = 0, i = this.playerObjects; e < i.length; e++) {
                var a = i[e];
                this.scene.remove(a.mesh)
            }
            this.playerObjects = this.gameState.players.map(function(e, i) {
                return new PlayerObject(e, t.playerHeight, t.playerColors[i])
            });
            for (var s = 0, r = this.playerObjects; s < r.length; s++) {
                var a = r[s];
                this.scene.add(a.mesh)
            }
            this.game.playerIndex < this.playerObjects.length && (this.camera.followTarget = this.playerObjects[this.game.playerIndex].mesh)
        }, t.prototype.initOrbGraphics = function() {
            for (var t = this, e = 0, i = this.orbObjects; e < i.length; e++) {
                var a = i[e];
                this.scene.remove(a.mesh), this.scene.remove(a.light)
            }
            this.orbObjects = this.gameState.orbs.map(function(e) {
                return new OrbObject(e, t.orbSize, t.orbHeight, t.orbColor, t.orbOpacity)
            });
            for (var s = 0, r = this.orbObjects; s < r.length; s++) {
                var a = r[s];
                this.scene.add(a.mesh), this.useOrbLights && this.gameState.orbs.length <= 10 && this.scene.add(a.light)
            }
        }, t.prototype.initControls = function() {
            var t = this;
            this.stats = new Stats, this.stats.dom.style.position = "absolute", this.stats.dom.style.top = "0px", this.container.appendChild(this.stats.dom), this.renderer.domElement.addEventListener("mousedown", this.onMouseDown.bind(this)), this.renderer.domElement.addEventListener("mouseup", this.onMouseUp.bind(this)), this.renderer.domElement.addEventListener("mousemove", this.onMouseMove.bind(this)), this.renderer.domElement.addEventListener("wheel", this.onWheel.bind(this)), this.renderer.domElement.addEventListener("contextmenu", function(t) {
                return t.preventDefault()
            }), this.renderer.domElement.addEventListener("keydown", this.onKeyDown.bind(this)), this.renderer.domElement.addEventListener("keyup", this.onKeyUp.bind(this)), this.renderer.domElement.addEventListener("blur", function(e) {
                t.leftPressed = t.rightPressed = t.upPressed = t.downPressed = t.zoomInPressed = t.zoomOutPressed = t.middleMouseClicked = !1
            }), $(window).resize(this.onWindowResize.bind(this))
        }, t.prototype.initHud = function() {
            this.runRepelIndicator = document.createElement("div"), this.runRepelIndicator.className = "run-repel-indicator", this.container.appendChild(this.runRepelIndicator), this.timerCanvas = document.createElement("canvas"), this.timerCanvas.className = "timer", this.timerCanvas.width = 2 * this.timerRadius + 2, this.timerCanvas.height = 2 * this.timerRadius + 2, this.container.appendChild(this.timerCanvas), this.timerContext = this.timerCanvas.getContext("2d"), this.scoreIndicator = document.createElement("div"), this.scoreIndicator.className = "score-indicator", this.container.appendChild(this.scoreIndicator), this.container.appendChild(this.clickIndicator.domElement)
        }, t.prototype.getWaterColor = function() {
            var t = AltarData[this.gameState.altar].waterColor;
            return null == t ? "#446688" : t.substr(0, 7)
        }, t.prototype.getWaterAlpha = function() {
            var t = AltarData[this.gameState.altar].waterColor;
            return null == t || t.length < 9 ? .7 : parseInt(t.substr(7, 2), 16) / 255
        }, t.prototype.mouseEventToRaycastVector = function(t) {
            return new THREE.Vector2(2 * (t.offsetX / this.renderer.domElement.clientWidth) - 1, 1 - 2 * (t.offsetY / this.renderer.domElement.clientHeight))
        }, t.prototype.clickableObjectsUnderLocation = function(t) {
            return this.raycaster.setFromCamera(t, this.camera), this.raycaster.intersectObjects(this.orbObjects.map(function(t) {
                return t.mesh
            }).concat(this.ground), !0)
        }, t.prototype.generateGroundTexture = function() {
            var t = AltarData[this.gameState.altar].groundColor,
                e = AltarData[this.gameState.altar].groundPattern;
            if (!(e && t instanceof Array)) return this.gridTexture;
            var i = document.createElement("canvas"),
                a = 2048,
                s = a / this.size,
                r = Math.round(s);
            i.width = a, i.height = a;
            var n = i.getContext("2d");
            n.fillStyle = t[0], n.fillRect(0, 0, i.width, i.height);
            for (var o = -this.radius; o <= this.radius; o++)
                for (var h = -this.radius; h <= this.radius; h++) {
                    var l = this.radius + h,
                        c = this.radius - o,
                        d = t[e[c][l]];
                    d !== t[0] && (n.fillStyle = d, n.fillRect(Math.round(s * l), Math.round(s * c), r, r))
                }
            n.lineWidth = 1, n.strokeStyle = "#222222", n.beginPath();
            for (var h = 1; h <= this.size; h++) n.moveTo(Math.floor(h * s) + .5, 0), n.lineTo(Math.floor(h * s) + .5, i.height);
            for (var o = 0; o < this.size; o++) n.moveTo(0, Math.floor(o * s) + .5), n.lineTo(i.width, Math.floor(o * s) + .5);
            n.stroke();
            var p = new THREE.Texture(i);
            return p.magFilter = THREE.NearestFilter, p.anisotropy = this.renderer.getMaxAnisotropy(), p.needsUpdate = !0, p
        }, t.prototype.setAltarAndSeed = function(t, e) {
            this.gameState.altar = t, this.gameState.seed = e
        }, t.prototype.startAnimation = function() {
            this.clock.start(), this.updateDisplay(), requestAnimationFrame(this.animate.bind(this))
        }, t.prototype.updateHud = function() {
            this.drawRunRepelIndicators(), this.drawTimer(), this.drawScore(), this.infoBox.update()
        }, t.prototype.drawRunRepelIndicators = function() {
            var t = this.game.player.run ? "#ddeedd" : "#ccbbbb",
                e = '<span style="color: ' + t + '">Run ' + (this.game.player.run ? "on" : "off") + "</span>",
                i = this.game.player.repel ? "#ddeedd" : "#ccbbbb",
                a = '<span style="color: ' + i + '">Repel ' + (this.game.player.repel ? "on" : "off") + "</span>";
            null != this.runRepelIndicator && (this.runRepelIndicator.innerHTML = e + "<br/>" + a)
        }, t.prototype.drawTimer = function() {
            this.timerContext.clearRect(0, 0, this.timerCanvas.width, this.timerCanvas.height);
            var t = GameState.ticksPerAltar - 3,
                e = this.timerRadius,
                i = this.timerCanvas.width / 2,
                a = this.timerCanvas.height / 2;
            this.timerContext.lineWidth = 2, this.timerContext.strokeStyle = "rgba(255, 255, 0, 0.6)", this.timerContext.beginPath(), this.timerContext.arc(i, a, e, 0, 2 * Math.PI), this.timerContext.stroke(), !this.game.isStarted || this.game.isFinished ? (this.timerContext.fillStyle = this.game.isStarted ? "rgba(0, 255, 0, 0.4)" : "rgba(0, 255, 255, 0.4)", this.timerContext.moveTo(i, a), this.timerContext.arc(i, a, e, 0, 2 * Math.PI), this.timerContext.fill()) : this.gameState.currentTick < t && (this.timerContext.fillStyle = this.gameState.currentTick >= .75 * t ? "rgba(255, 0, 0, 0.4)" : "rgba(255, 255, 0, 0.4)", this.timerContext.beginPath(), this.timerContext.moveTo(i, a), this.timerContext.arc(i, a, e, -Math.PI / 2, -Math.PI / 2 - 2 * Math.PI * (1 - this.gameState.currentTick / t), !0), this.timerContext.lineTo(i, a), this.timerContext.fill()), this.timerContext.textAlign = "center", this.timerContext.textBaseline = "middle", this.timerContext.font = "20px Open Sans", this.timerContext.fillStyle = "#ffff80", this.timerContext.fillText(this.gameState.currentTick.toString(), i, a)
        }, t.prototype.drawScore = function() {
            this.scoreIndicator.innerHTML = '\n<span style="font-size: 24px">' + this.gameState.score + '<br/>\n<span style="color: #ccc; font-size: 16px">Estimated: ' + this.gameState.getEstimatedScore() + "</span>"
        }, t.prototype.restart = function(t) {
            void 0 === t && (t = !0), this.game.restart(t), t ? this.tickProgress = 1 : this.tickProgress = 0, this.displayedAltar !== this.gameState.altar && this.initAltarGraphics(), this.isInitialized && this.updateDisplay(), this.infoBox.resetSaveState(0)
        }, t.prototype.restartFromCode = function(t) {
            var e = this;
            return this.game.restartFromCode(t).always(function() {
                e.initAltarGraphics(), e.initPlayerGraphics(), e.initOrbGraphics()
            })
        }, t.prototype.rewind = function(t) {
            if (void 0 === t && (t = 7), this.game.isStarted) {
                var e = this.gameState.currentTick - t;
                this.restart(!1), this.game.start();
                for (var i = 0; i < e; i++) this.game.tick();
                this.updateDisplay()
            }
        }, t.prototype.fastForward = function(t) {
            void 0 === t && (t = 7), this.game.isStarted || this.game.start();
            for (var e = 0; e < t; e++) this.game.tick();
            this.updateDisplay()
        }, t.prototype.updateOrbsVisibility = function() {
            for (var t = 0, e = this.gameState.orbs; t < e.length; t++) {
                var i = e[t];
                i.index < this.orbObjects.length && (this.orbObjects[i.index].mesh.visible = Point.walkingDistance(i.location, this.game.player.location) <= this.orbVisibilityRadius)
            }
        }, t.prototype.updateAttractDots = function() {
            for (var t = 0, e = this.attractDots; t < e.length; t++) {
                var i = e[t];
                this.scene.remove(i.mesh)
            }
            this.attractDots = [];
            for (var a = 0, s = this.playerObjects; a < s.length; a++) {
                var r = s[a];
                if (r.player.isAttracting && null !== r.player.currentOrb) {
                    var n = this.orbObjects[r.player.currentOrb.index],
                        i = void 0,
                        o = new THREE.Color(this.orbColor),
                        h = o.getHSL(),
                        l = h.h,
                        c = h.s;
                    o.setHSL(l, c, .75), i = r.player.repel ? new AttractDot(n.mesh, r.mesh, o.getHex()) : new AttractDot(r.mesh, n.mesh, o.getHex()), this.attractDots.push(i), this.scene.add(i.mesh)
                }
            }
        }, t.prototype.updateDisplay = function() {
            this.game.isFinished && (this.tickProgress = 0), this.updateOrbsVisibility(), this.updateAttractDots(), this.updateHud()
        }, t.prototype.pause = function() {
            this.game.pause(), this.optionsMenu.visible = !0
        }, t.prototype.resume = function() {
            this.game.resume(), this.optionsMenu.visible = !1
        }, t.prototype.tick = function() {
            this.game.tick(), this.updateDisplay(), this.infoBox.tick()
        }, t.prototype.update = function(t) {
            !this.game.isStarted || this.game.isPaused || this.game.isFinished || (this.tickProgress += 1e3 * t / this.tickLength, this.autoTick && this.tickProgress >= 1 && (this.tickProgress %= 1, this.tick()));
            for (var e = 0, i = this.playerObjects; e < i.length; e++) {
                var a = i[e];
                a.update(this.tickProgress)
            }
            for (var s = 0, r = this.orbObjects; s < r.length; s++) {
                var n = r[s];
                n.update(this.tickProgress)
            }
            this.camera.update(t);
            for (var o = 0, h = this.attractDots; o < h.length; o++) {
                var l = h[o];
                l.update(this.tickProgress)
            }
            this.skybox.rotation.y += Math.PI * t / 150;
            var c = this.upPressed ? 1 : this.downPressed ? -1 : 0,
                d = this.rightPressed ? 1 : this.leftPressed ? -1 : 0;
            if (0 === d && 0 === c || this.camera.rotateAroundTarget(d * this.cameraRotateXSpeed * t, c * this.cameraRotateYSpeed * t), this.zoomInPressed && this.camera.zoomTowardTarget(-this.zoomSpeed * t * .1), this.zoomOutPressed && this.camera.zoomTowardTarget(this.zoomSpeed * t * .1), void 0 !== this.mouseVector) {
                this.raycaster.setFromCamera(this.mouseVector, this.camera);
                var p = this.raycaster.intersectObjects(this.orbObjects.map(function(t) {
                    return t.mesh
                }), !0);
                this.renderer.domElement.style.cursor = p.length > 0 ? "pointer" : "default"
            }
            this.clickIndicator.update(t)
        }, t.prototype.render = function(t) {
            this.renderer.render(this.scene, this.camera)
        }, t.prototype.animate = function() {
            requestAnimationFrame(this.animate.bind(this));
            var t = this.clock.getDelta();
            this.update(t), this.render(t), this.stats.update()
        }, t.prototype.onSaveClicked = function() {
			document.getElementById('code').innerHTML = this.game.gameplayData.toString();
			/*
            var t = this.infoBox.saveButton;
            t.disabled = !0, t.textContent = "Saving...", 1 === this.gameState.players.length ? $.post("api/solo", {
                numberOfOrbs: this.gameState.numberOfOrbs,
                seed: this.gameState.seed,
                altar: this.gameState.altar,
                score: this.gameState.score,
                code: this.game.gameplayData.toString()
            }, function() {
                t.textContent = "Saved"
            }) : $.post("/api/multiplayer/solo", {
                numberOfPlayers: this.gameState.players.length,
                numberOfOrbs: this.gameState.numberOfOrbs,
                seed: this.gameState.seed,
                altar: this.gameState.altar,
                score: this.gameState.score,
                code: this.game.gameplayData.toString()
            }, function() {
                t.textContent = "Saved to Multiplayer"
            })
			*/
        }, t.prototype.onKeyDown = function(t) {
            var e = !0;
            if (t.ctrlKey && "s" === t.key) this.infoBox.canSave() && this.infoBox.saveButton.click();
            else switch (t.key) {
                case this.keybinds.run:
                    this.game.isPaused || (this.game.setMyRunAndRepel(!this.game.player.run, null), this.drawRunRepelIndicators());
                    break;
                case this.keybinds.repel:
                    this.game.isPaused || (this.game.setMyRunAndRepel(null, !0), this.drawRunRepelIndicators());
                    break;
                case this.keybinds.attract:
                    this.game.isPaused || (this.game.setMyRunAndRepel(null, !1), this.drawRunRepelIndicators());
                    break;
                case "w":
                case "W":
                case "ArrowUp":
                case "Up":
                    this.upPressed = !0;
                    break;
                case "s":
                case "S":
                case "ArrowDown":
                case "Down":
                    this.downPressed = !0;
                    break;
                case "a":
                case "A":
                case "ArrowLeft":
                case "Left":
                    this.leftPressed = !0;
                    break;
                case "d":
                case "D":
                case "ArrowRight":
                case "Right":
                    this.rightPressed = !0;
                    break;
                case "PageUp":
                    this.zoomInPressed = !0;
                    break;
                case "PageDown":
                    this.zoomOutPressed = !0;
                    break;
                case "R":
                    this.restart();
                    break;
                case this.keybinds.rewind:
                    this.rewind();
                    break;
                case this.keybinds.fastForward:
                    this.fastForward();
                    break;
                case "Escape":
                case "Esc":
                    this.isPaused ? this.resume() : this.pause();
                    break;
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                    if (!this.allowPlayerSwitching || t.ctrlKey || t.shiftKey) e = !1;
                    else {
                        var i = +t.key - 1;
                        i < this.gameState.players.length && (this.playerIndex = i, this.updateHud(), this.updateOrbsVisibility())
                    }
                    break;
                default:
                    e = !1
            }
            e && t.preventDefault()
        }, t.prototype.onKeyUp = function(t) {
            switch (t.preventDefault(), t.key) {
                case "w":
                case "W":
                case "ArrowUp":
                case "Up":
                    this.upPressed = !1;
                    break;
                case "s":
                case "S":
                case "ArrowDown":
                case "Down":
                    this.downPressed = !1;
                    break;
                case "a":
                case "A":
                case "ArrowLeft":
                case "Left":
                    this.leftPressed = !1;
                    break;
                case "d":
                case "D":
                case "ArrowRight":
                case "Right":
                    this.rightPressed = !1;
                    break;
                case "PageUp":
                    this.zoomInPressed = !1;
                    break;
                case "PageDown":
                    this.zoomOutPressed = !1
            }
        }, t.prototype.onMouseDown = function(t) {
            if ($(t.currentTarget).focus(), 0 === t.button) {
                if (this.game.isPaused) return;
                t.preventDefault(), this.contextMenu.hidden = !0, this.mouseVector = this.mouseEventToRaycastVector(t);
                var e = this.clickableObjectsUnderLocation(this.mouseVector);
                if (e.length > 0) {
                    var i = e[0],
                        a = Utils.findIndex(this.orbObjects, function(t) {
                            return t.mesh === i.object || t.circle === i.object
                        });
                    if (a !== -1) this.doClickAction(GameAction.attract(a, !1, !1, !0), 1, t.offsetX, t.offsetY);
                    else {
                        var s = new Point(Math.round(i.point.x), Math.round(i.point.y));
                        s.equals(this.game.player.location) || GopBoard.isInAltar(s) && GopBoard.isPlayerAdjacentToAltar(this.game.player.location) ? this.doClickAction(GameAction.idle(), GopBoard.isInAltar(s) ? 1 : 0, t.offsetX, t.offsetY) : GopBoard.isInAltar(s) ? this.doClickAction(GameAction.move(this.gameState.board.nearestAltarPoint(this.game.player.location, PathMode.Player)), 1, t.offsetX, t.offsetY) : this.doClickAction(GameAction.move(s), 0, t.offsetX, t.offsetY)
                    }
                }
            } else 1 === t.button ? (t.preventDefault(), this.middleMouseClicked = !0) : 2 === t.button && this.showContextMenu(t)
        }, t.prototype.onMouseUp = function(t) {
            1 === t.button && (this.middleMouseClicked = !1)
        }, t.prototype.onMouseMove = function(t) {
            if (this.mouseVector = this.mouseEventToRaycastVector(t), !this.contextMenu.hidden) {
                var e = 20;
                (t.offsetX < this.contextMenu.offsetLeft - e || t.offsetX > this.contextMenu.offsetLeft + this.contextMenu.offsetWidth + e || t.offsetY < this.contextMenu.offsetTop - e || t.offsetY > this.contextMenu.offsetTop + this.contextMenu.offsetHeight + e) && (this.contextMenu.hidden = !0)
            }
            this.middleMouseClicked && this.camera.rotateAroundTarget(-this.mouseRotateSensitivity * t.movementX, this.mouseRotateSensitivity * t.movementY)
        }, t.prototype.onWheel = function(t) {
            t.preventDefault();
            var e = t.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? -1.2 : t.deltaMode === WheelEvent.DOM_DELTA_LINE ? -40 : 1;
            this.camera.zoomTowardTarget(-this.mouseWheelZoomFactor * e * t.deltaY)
        }, t.prototype.onWindowResize = function() {
            this.renderer.setSize(window.innerWidth, window.innerHeight), this.camera.aspect = window.innerWidth / window.innerHeight, this.camera.updateProjectionMatrix()
        }, t.prototype.doClickAction = function(t, e, i, a) {
            this.clickIndicator.start(this.clickIndicatorImages[e], i, a, 4, this.clickIndicatorDuration / 4), this.game.setMyAction(t)
        }, t.prototype.showContextMenu = function(t) {
            var e = this,
                i = $('<ul class="context-menu"/>');
            this.mouseVector = this.mouseEventToRaycastVector(t);
            var a = this.clickableObjectsUnderLocation(this.mouseVector);
            if (0 !== a.length) {
                for (var s = [], r = function(t) {
                        var a = Utils.findIndex(n.orbObjects, function(e) {
                            return t.object === e.mesh || t.object === e.circle
                        });
                        if (a === -1 || s[a]) {
                            if (t.object === n.ground) {
                                var r = new Point(Math.round(t.point.x), Math.round(t.point.y)),
                                    o = $('<li class="context-menu-item">Walk to ' + r + "</li>").mousedown(function(t) {
                                        t.preventDefault(), 0 === t.button && (e.contextMenu.hidden = !0, e.doClickAction(GameAction.move(r), 0, t.pageX, t.pageY))
                                    });
                                i.append(o)
                            }
                        } else {
                            s[a] = !0;
                            var o = $('<li class="context-menu-item">Attract <span style="color: yellow">Orb ' + GameAction.orbIndexToChar(a) + "</span></li>").mousedown(function(t) {
                                t.preventDefault(), 0 === t.button && (e.contextMenu.hidden = !0, e.doClickAction(GameAction.attract(a), 1, t.pageX, t.pageY))
                            });
                            i.append(o)
                        }
                    }, n = this, o = 0, h = a; o < h.length; o++) {
                    var l = h[o];
                    r(l)
                }
                $(this.contextMenu).empty().append(i), this.contextMenu.hidden = !1, $(this.contextMenu).css({
                    left: Math.min(this.width - this.contextMenu.clientWidth, t.offsetX - 25),
                    top: t.offsetY
                })
            }
        }, t
    }();
GopUI3D.waterZOffset = .02;
var InfoBox = function() {
        function t(t, e) {
            void 0 === e && (e = !1), this.gopui = t, this.allowSave = e, this.hasSaved = !1
        }
        return t.prototype.init = function() {
            var t = this;
            this.element = $("<div/>").addClass("info-box")[0], this.gopui.container.appendChild(this.element), this.altarSeedElement = $("<div/>")[0], this.element.appendChild(this.altarSeedElement), this.gameFinishedElement = $("<div/>")[0], this.gameFinishedElement.hidden = !0, this.element.appendChild(this.gameFinishedElement), this.finalScoreSpan = $("<span>Final score 0:</span>")[0], this.finalScoreSpan.style.color = "#00ff00", this.gameFinishedElement.appendChild(this.finalScoreSpan), this.allowSave && !this.game.isCustom && (this.saveButton = $("<button>Save</button>").addClass("btn btn-primary")[0], this.saveButton.style.pointerEvents = "auto", this.saveButton.addEventListener("click", function() {
                t.gopui.onSaveClicked()
            }), this.gameFinishedElement.appendChild(document.createElement("br")), this.gameFinishedElement.appendChild(this.saveButton)), this.update()
        }, Object.defineProperty(t.prototype, "game", {
            get: function() {
                return this.gopui.game
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "gameState", {
            get: function() {
                return this.gopui.game.gameState
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.update = function() {
            this.altarSeedElement.textContent = AltarData[this.gameState.altar].name + " altar, seed " + this.gameState.seed, this.gameFinishedElement.hidden = !this.game.isFinished, null != this.saveButton && (this.saveButton.disabled = !this.game.isFinished), this.game.isFinished && (this.finalScoreSpan.textContent = "Final score: " + this.gameState.score + " ")
        }, t.prototype.canSave = function() {
            return null != this.saveButton && !this.gameFinishedElement.hidden && !this.saveButton.disabled
        }, t.prototype.resetSaveState = function(t) {
            var e = this;
            null == this.saveTimeoutHandle && (this.saveTimeoutHandle = setTimeout(function() {
                e.saveTimeoutHandle = null, e.hasSaved = !1, e.saveButton.disabled = !1, e.saveButton.textContent = "Save"
            }, t))
        }, t.prototype.tick = function() {
            this.hasSaved && this.resetSaveState(3e3)
        }, t.prototype.onSaveClicked = function(t) {
            this.hasSaved = !0, this.gopui.onSaveClicked()
        }, t
    }(),
    OptionsMenu = function() {
        function t(t) {
            this.parent = t, this.options = [], this.enabled = !0
        }
        return Object.defineProperty(t.prototype, "visible", {
            get: function() {
                return !this.overlayContainer.hidden
            },
            set: function(t) {
                this.enabled && (this.overlayContainer.hidden = !t,
                    t && this.update())
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "game", {
            get: function() {
                return this.parent.game
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "gameState", {
            get: function() {
                return this.parent.game.gameState
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "gameplayData", {
            get: function() {
                return this.parent.game.gameplayData
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.init = function() {
            var t = this;
            this.overlayContainer = document.createElement("div"), this.overlayContainer.hidden = !0, this.overlayContainer.classList.add("overlay-container"), this.parent.container.appendChild(this.overlayContainer), this.mainMenu = document.createElement("div"), this.mainMenu.classList.add("main-menu"), this.mainMenu.tabIndex = 1, this.mainMenu.addEventListener("contextmenu", function(e) {
                e.target === t.mainMenu && e.preventDefault()
            }), this.mainMenu.addEventListener("keydown", this.onKeyDown.bind(this)), this.overlayContainer.appendChild(this.mainMenu), this.header = document.createElement("h3"), this.header.textContent = "Options", this.mainMenu.appendChild(this.header);
            var e = this.addOption("altar", "Altar", function() {
                    return t.gameState.altar
                }, void 0, {
                    inputStyleWidth: "100px"
                }, !1),
                i = this.addOption("seed", "Seed", function() {
                    return t.gameState.seed
                }, void 0, void 0, !1),
                a = $('<button class="btn btn-warning">Restart</button>').click(function(a) {
                    var s = +e.inputElement.value,
                        r = +i.inputElement.value;
                    Utils.loadAltar(s).fail(function() {
                        s = Altar.None
                    }).always(function() {
                        t.parent.setAltarAndSeed(s, r), t.parent.restart()
                    })
                });
            this.mainMenu.appendChild(a[0]), this.addSeparator(), this.addOption("fov", "Field of view:", function() {
                return t.parent.camera.fov
            }, function(e) {
                t.parent.camera.fov = e, t.parent.camera.updateProjectionMatrix()
            }, {
                min: 0,
                max: 360,
                step: 1,
                fullLabelWidth: !0
            }), this.addOption("orbSize", "Orb size:", function() {
                return t.parent.orbSize
            }, function(e) {
                t.parent.orbSize = e, t.parent.initOrbGraphics()
            }, {
                min: 0,
                max: 53,
                step: .05,
                fullLabelWidth: !0
            }), this.addOption("orbColor", "Orb color:", function() {
                return t.parent.orbColor
            }, function(e) {
                t.parent.orbColor = e, t.parent.initOrbGraphics()
            }, {
                fullLabelWidth: !0
            }), this.addOption("orbOpacity", "Orb opacity:", function() {
                return t.parent.orbOpacity
            }, function(e) {
                t.parent.orbOpacity = e, t.parent.initOrbGraphics()
            }, {
                min: 0,
                max: 1,
                step: .05,
                fullLabelWidth: !0
            }), this.addOption("useShadows", "Shadows&nbsp;", function() {
                return t.parent.useShadows
            }, function(e) {
                t.parent.useShadows = e
            }), this.addOption("useOrbLights", "Orb lights&nbsp;", function() {
                return t.parent.useOrbLights
            }, function(e) {
                t.parent.useOrbLights = e, t.parent.initOrbGraphics()
            }), this.addOption("useAltarLight", "Altar light&nbsp;", function() {
                return t.parent.scene.children.indexOf(t.parent.altarLight) !== -1
            }, function(e) {
                e ? t.parent.scene.add(t.parent.altarLight) : t.parent.scene.remove(t.parent.altarLight)
            }), this.parent.allowConfigureTickLength && (this.addSeparator(), this.addOption("tickLength", "Tick length (ms):", function() {
                return t.parent.tickLength
            }, function(e) {
                t.parent.tickLength = e
            })), this.addSeparator(), this.addOption("runKey", "Run key:", function() {
                return t.parent.keybinds.run
            }, function(e) {
                t.parent.keybinds.run = e
            }, {
                inputStyleWidth: "100px"
            }), this.addOption("repelKey", "Repel key:", function() {
                return t.parent.keybinds.repel
            }, function(e) {
                t.parent.keybinds.repel = e
            }, {
                inputStyleWidth: "100px"
            }), this.addOption("attractKey", "Attract key:", function() {
                return t.parent.keybinds.attract
            }, function(e) {
                t.parent.keybinds.attract = e
            }, {
                inputStyleWidth: "100px"
            }), this.addOption("rewindKey", "Rewind key:", function() {
                return t.parent.keybinds.rewind
            }, function(e) {
                t.parent.keybinds.rewind = e
            }, {
                inputStyleWidth: "100px"
            }), this.addOption("fastForwardKey", "Fast forward key:", function() {
                return t.parent.keybinds.fastForward
            }, function(e) {
                t.parent.keybinds.fastForward = e
            }, {
                inputStyleWidth: "100px"
            }), this.addSeparator(), this.scoredTicksElement = $('<input class="for-copying" readonly/>')[0];
            var s = $("<label>Scored ticks: </label>").width("100%").append(this.scoredTicksElement);
            this.mainMenu.appendChild(s[0]), this.shareLinkElement = $('<input class="for-copying" readonly/>')[0];
            var r = $("<label>Share link: </label>").width("100%").append(this.shareLinkElement);
            this.mainMenu.appendChild(r[0]);
            var n = $('<a href="/Solo/History" target="_blank">View solo history</a>');
            this.mainMenu.appendChild(n[0]), $(".for-copying").click(function(t) {
                $(t.currentTarget).select()
            });
            var o = a[0];
            Utils.bindEnterKeyToButton(e.inputElement, o), Utils.bindEnterKeyToButton(i.inputElement, o)
        }, t.prototype.initOptionsFromLocalStorage = function() {
            for (var t = 0, e = this.options; t < e.length; t++) {
                var i = e[t],
                    a = i.get(),
                    s = localStorage.getItem(i.name);
                null !== s && ("boolean" == typeof a ? i.set("true" === s) : "number" == typeof a ? i.set(+s) : i.set(s))
            }
        }, t.prototype.addOption = function(t, e, i, a, s, r) {
            void 0 === s && (s = {}), void 0 === r && (r = !0);
            var n, o = i();
            n = "number" == typeof o ? this.addNumericInput(e, s.min, s.max, s.step, s.fullLabelWidth) : "boolean" == typeof o ? this.addBooleanInput(e, s.fullLabelWidth) : this.addTextInput(e, s.fullLabelWidth), void 0 !== s.inputStyleWidth && (n.style.width = s.inputStyleWidth), void 0 !== a && n.addEventListener("change", function(e) {
                var i = e.currentTarget.value;
                if ("boolean" == typeof o) {
                    var s = e.currentTarget.checked;
                    a(s), i = s.toString()
                } else a("number" == typeof o ? +i : i);
                r && localStorage.setItem(t, i)
            });
            var h = {
                name: t,
                inputElement: n,
                useLocalStorage: r,
                get: i,
                set: a
            };
            return this.options.push(h), h
        }, t.prototype.addSeparator = function() {
            this.mainMenu.appendChild(document.createElement("hr"))
        }, t.prototype.update = function() {
            for (var t = 0, e = this.options; t < e.length; t++) {
                var i = e[t],
                    a = i.get();
                "boolean" == typeof a ? i.inputElement.checked = a : i.inputElement.value = a
            }
            this.updateScoredTicks(), this.updateShareLink()
        }, t.prototype.addTextInput = function(t, e) {
            void 0 === e && (e = !1);
            var i = $('<input type="text"/>').addClass("form-control"),
                a = $("<label/>").text(t).append(i);
            return e && a.width("100%"), this.mainMenu.appendChild(a[0]), i[0]
        }, t.prototype.addNumericInput = function(t, e, i, a, s) {
            void 0 === e && (e = 0), void 0 === i && (i = 2147483647), void 0 === a && (a = 1), void 0 === s && (s = !1);
            var r = $('<input type="number"/>').attr({
                    min: e,
                    max: i,
                    step: a
                }).addClass("form-control"),
                n = $("<label/>").text(t).append(r);
            return s && n.width("100%"), this.mainMenu.appendChild(n[0]), r[0]
        }, t.prototype.addBooleanInput = function(t, e) {
            void 0 === e && (e = !1);
            var i = $('<input type="checkbox"/>'),
                a = $("<label/>").append(i).append(t);
            return e && a.width("100%"), this.mainMenu.appendChild(a[0]), i[0]
        }, t.prototype.updateScoredTicks = function() {
            this.scoredTicksElement.value = this.gameState.scoredTicks.join(" ")
        }, t.prototype.updateShareLink = function() {
            var t = [];
            this.gameState.numberOfOrbs !== GameState.defaults.numberOfOrbs && t.push("numorbs=" + this.gameState.numberOfOrbs), this.gameState.board.reachDistance !== GopBoard.defaults.reachDistance && t.push("reach=" + this.gameState.board.reachDistance), GameState.ticksPerAltar !== GameState.defaults.ticksPerAltar && t.push("ticks=" + GameState.ticksPerAltar), this.gameState.presetSpawns.length > 0 && t.push("spawns=" + Utils.pointArrayToJSON(this.gameState.presetSpawns)), this.gameState.respawnOrbs !== GameState.defaults.respawnOrbs && t.push("respawn=" + this.gameState.respawnOrbs), t.push("code=" + this.gameplayData.toString().replace(/ /g, "+")), this.shareLinkElement.value = location.protocol + "//" + location.host + "/Solo?" + t.join("&")
        }, t.prototype.onKeyDown = function(t) {
            "Escape" !== t.key && "Esc" !== t.key || (this.overlayContainer.hidden = !0, this.parent.resume(), this.parent.renderer.domElement.focus())
        }, t
    }(),
    OrbObject = function() {
        function t(t, e, i, a, s) {
            this.orb = t, this.mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(e, 32, 16), new THREE.MeshPhongMaterial({
                color: a,
                specular: 6316128,
                shininess: 60,
                transparent: s < 1,
                opacity: s
            })), this.mesh.position.set(t.location.x, t.location.y, i), this.mesh.renderOrder = 1, this.circle = new THREE.Mesh(new THREE.CircleGeometry(Math.min(.5, e), 16), new THREE.MeshBasicMaterial({
                color: 0,
                transparent: !0,
                opacity: .35,
                depthWrite: !1
            })), this.circle.position.z = -i + 2 * GopUI3D.waterZOffset, this.mesh.add(this.circle);
            var r = new THREE.Color(a),
                n = r.getHSL(),
                o = n.h,
                h = n.s,
                l = n.l;
            r.setHSL(o, h, Math.max(.5, l)), this.light = new THREE.PointLight(r.getHex(), 1.2, 15, 2)
        }
        return t.prototype.update = function(t) {
            var e = this.orb.getDrawLocation(t);
            this.mesh.position.x = e.x, this.mesh.position.y = e.y, void 0 !== this.light && this.light.position.copy(this.mesh.position)
        }, t
    }(),
    PlayerObject = function() {
        function t(t, e, i) {
            this.player = t, this.mesh = new THREE.Mesh(new THREE.BoxGeometry(.6, .6, e), new THREE.MeshPhongMaterial({
                color: i
            })), this.mesh.position.set(t.location.x, t.location.y, e / 2), this.mesh.castShadow = !0, this.mesh.receiveShadow = !0
        }
        return t.prototype.update = function(t) {
            var e = this.player.getDrawLocation(t);
            this.mesh.position.x = e.x, this.mesh.position.y = e.y
        }, t
    }();