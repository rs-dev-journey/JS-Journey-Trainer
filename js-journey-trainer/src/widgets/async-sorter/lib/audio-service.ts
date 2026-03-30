class AudioService {
  private readonly ctx: AudioContext = new globalThis.AudioContext();

  private playTone(frequency: number, duration: number, type: OscillatorType, volume = 0.2): void {
    const oscillator = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, this.ctx.currentTime);

    gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    oscillator.start();
    oscillator.stop(this.ctx.currentTime + duration);
  }

  public click = (): void => this.playTone(600, 0.05, 'triangle');

  public correct = (): void => {
    this.playTone(440, 0.1, 'sine');
    setTimeout(() => this.playTone(554, 0.1, 'sine'), 100);
    setTimeout(() => this.playTone(659, 0.2, 'sine'), 200);
  };

  public wrong = (): void => this.playTone(150, 0.3, 'sawtooth', 0.1);

  public undo = (): void => {
    this.playTone(400, 0.1, 'sine', 0.1);
    setTimeout(() => this.playTone(300, 0.15, 'sine', 0.05), 50);
  };

  public fly = (): void => {
    const duration = 0.6;
    const oscillator = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    oscillator.type = 'sine';

    oscillator.frequency.setValueAtTime(400, this.ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + duration);

    gainNode.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    oscillator.start();
    oscillator.stop(this.ctx.currentTime + duration);
  };
}

export const sounds = new AudioService();
